const STORAGE_KEY = "couple-budget-simple-v1";

const categories = [
  { key: "convenience", label: "食費 / コンビニ", group: "食費" },
  { key: "restaurant", label: "食費 / 外食", group: "食費" },
  { key: "supermarket", label: "食費 / スーパー", group: "食費" },
  { key: "daily", label: "日用品", group: "日用品" },
  { key: "rent", label: "家賃", group: "家賃" },
  { key: "phone", label: "通信費", group: "通信費" },
  { key: "fun", label: "娯楽", group: "娯楽" },
  { key: "other", label: "その他", group: "その他" },
];

const initialState = {
  myIncome: 0,
  partnerIncome: 0,
  myShared: 0,
  partnerShared: 0,
  expenses: [],
};

let state = loadState();

const elements = {
  sharedBalance: document.querySelector("#sharedBalance"),
  myBalance: document.querySelector("#myBalance"),
  partnerBalance: document.querySelector("#partnerBalance"),
  dailyBudget: document.querySelector("#dailyBudget"),
  monthLabel: document.querySelector("#monthLabel"),
  setupForm: document.querySelector("#setupForm"),
  myIncome: document.querySelector("#myIncome"),
  partnerIncome: document.querySelector("#partnerIncome"),
  myShared: document.querySelector("#myShared"),
  partnerShared: document.querySelector("#partnerShared"),
  expenseForm: document.querySelector("#expenseForm"),
  expenseText: document.querySelector("#expenseText"),
  prediction: document.querySelector("#prediction"),
  spentTotal: document.querySelector("#spentTotal"),
  categoryList: document.querySelector("#categoryList"),
  expenseList: document.querySelector("#expenseList"),
  expenseItemTemplate: document.querySelector("#expenseItemTemplate"),
  clearExpensesButton: document.querySelector("#clearExpensesButton"),
  resetButton: document.querySelector("#resetButton"),
};

function loadState() {
  const saved = readStorage();
  if (!saved) return { ...initialState };

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  writeStorage(JSON.stringify(normalizeState(state)));
}

function readStorage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStorage(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // 保存できない環境でも、入力中の画面操作は続けられるようにする。
  }
}

function normalizeState(savedState) {
  return {
    myIncome: toSafeNumber(savedState?.myIncome),
    partnerIncome: toSafeNumber(savedState?.partnerIncome),
    myShared: toSafeNumber(savedState?.myShared),
    partnerShared: toSafeNumber(savedState?.partnerShared),
    expenses: Array.isArray(savedState?.expenses) ? savedState.expenses : [],
  };
}

function toSafeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function yen(value) {
  return `${Math.max(0, Math.round(value)).toLocaleString("ja-JP")}円`;
}

function spentFrom(wallet) {
  return state.expenses
    .filter((expense) => expense.wallet === wallet)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function getBalances() {
  const sharedStart = Number(state.myShared) + Number(state.partnerShared);
  const myStart = Number(state.myIncome) - Number(state.myShared);
  const partnerStart = Number(state.partnerIncome) - Number(state.partnerShared);

  return {
    shared: sharedStart - spentFrom("共有財布"),
    my: myStart - spentFrom("わたし"),
    partner: partnerStart - spentFrom("パートナー"),
  };
}

function daysLeftInMonth() {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  return Math.max(1, lastDay - today.getDate() + 1);
}

function parseExpense(text) {
  const amountMatch = text.match(/([0-9０-９,，]+)\s*円?/);
  const amount = amountMatch ? Number(toHalfWidth(amountMatch[1]).replace(/[，,]/g, "")) : 0;
  const name = text.replace(amountMatch?.[0] || "", "").trim() || "支出";
  const normalized = toHalfWidth(text).toLowerCase();
  const category = detectCategory(normalized);
  const wallet = detectWallet(normalized, category);

  return { name, amount, category, wallet };
}

function toHalfWidth(text) {
  return text.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}

function detectCategory(text) {
  const rules = [
    ["convenience", ["セブン", "seven", "ローソン", "lawson", "ファミマ", "familymart", "コンビニ"]],
    ["restaurant", ["外食", "ランチ", "夕食", "ごはん", "カフェ", "マック", "すき家", "レストラン"]],
    ["supermarket", ["スーパー", "イオン", "西友", "ライフ", "オーケー", "まいばす", "食材"]],
    ["daily", ["日用品", "薬局", "ドラッグ", "洗剤", "ティッシュ", "シャンプー"]],
    ["rent", ["家賃", "賃料"]],
    ["phone", ["通信", "スマホ", "携帯", "wifi", "wi-fi", "ネット"]],
    ["fun", ["映画", "娯楽", "遊び", "ゲーム", "旅行", "デート"]],
  ];

  const match = rules.find(([, words]) => words.some((word) => text.includes(word)));
  return match ? match[0] : "other";
}

function detectWallet(text, category) {
  if (text.includes("わたし") || text.includes("私") || text.includes("自分")) return "わたし";
  if (text.includes("パートナー") || text.includes("相手")) return "パートナー";
  if (["convenience", "restaurant", "supermarket", "daily", "rent", "phone"].includes(category)) {
    return "共有財布";
  }
  return "共有財布";
}

function categoryLabel(key) {
  return categories.find((category) => category.key === key)?.label || "その他";
}

function render() {
  const balances = getBalances();
  const sharedSpent = spentFrom("共有財布");
  const totalSpent = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const now = new Date();

  elements.sharedBalance.textContent = yen(balances.shared);
  elements.myBalance.textContent = yen(balances.my);
  elements.partnerBalance.textContent = yen(balances.partner);
  elements.dailyBudget.textContent = yen(balances.shared / daysLeftInMonth());
  elements.spentTotal.textContent = `${yen(totalSpent)} 使用`;
  elements.monthLabel.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月`;

  elements.myIncome.value = state.myIncome || "";
  elements.partnerIncome.value = state.partnerIncome || "";
  elements.myShared.value = state.myShared || "";
  elements.partnerShared.value = state.partnerShared || "";

  renderCategories(sharedSpent);
  renderExpenses();
}

function renderCategories(sharedSpent) {
  elements.categoryList.innerHTML = "";

  categories.forEach((category) => {
    const total = state.expenses
      .filter((expense) => expense.category === category.key)
      .reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = sharedSpent > 0 ? Math.min(100, (total / sharedSpent) * 100) : 0;

    const row = document.createElement("div");
    row.className = "category-row";
    row.innerHTML = `
      <div class="category-head">
        <span>${category.label}</span>
        <strong>${yen(total)}</strong>
      </div>
      <div class="meter" aria-hidden="true"><span style="--value: ${percentage}%"></span></div>
    `;
    elements.categoryList.append(row);
  });
}

function renderExpenses() {
  elements.expenseList.innerHTML = "";

  if (state.expenses.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "まだ支出はありません";
    elements.expenseList.append(empty);
    return;
  }

  state.expenses.forEach((expense) => {
    const item = elements.expenseItemTemplate.content.firstElementChild.cloneNode(true);
    item.querySelector(".expense-title").textContent = expense.name;
    item.querySelector(".expense-meta").textContent = `${categoryLabel(expense.category)} / ${expense.wallet}`;
    item.querySelector(".expense-amount").textContent = yen(expense.amount);
    item.querySelector(".delete-button").addEventListener("click", () => {
      state.expenses = state.expenses.filter((itemExpense) => itemExpense.id !== expense.id);
      saveState();
      render();
    });
    elements.expenseList.append(item);
  });
}

elements.setupForm.addEventListener("input", (event) => {
  const target = event.target;
  if (!target.id) return;

  state[target.id] = Number(toHalfWidth(target.value).replace(/[^\d]/g, ""));
  saveState();
  render();
});

elements.expenseText.addEventListener("input", () => {
  const text = elements.expenseText.value.trim();
  if (!text) {
    elements.prediction.textContent = "入力すると自動で分類します";
    return;
  }

  const expense = parseExpense(text);
  elements.prediction.textContent = `${categoryLabel(expense.category)} / ${expense.wallet} / ${yen(expense.amount)}`;
});

elements.expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.expenseText.value.trim();
  const expense = parseExpense(text);

  if (!expense.amount) {
    elements.prediction.textContent = "金額を入れてください。例: セブン 240円";
    return;
  }

  state.expenses.unshift({
    ...expense,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  elements.expenseText.value = "";
  elements.prediction.textContent = "入力すると自動で分類します";
  saveState();
  render();
});

elements.clearExpensesButton.addEventListener("click", () => {
  state.expenses = [];
  saveState();
  render();
});

elements.resetButton.addEventListener("click", () => {
  state = { ...initialState, expenses: [] };
  saveState();
  render();
});

render();
