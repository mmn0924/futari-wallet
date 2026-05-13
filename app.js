const STORAGE_KEY = "couple-budget-simple-v1";
const STORAGE_KEYS = [STORAGE_KEY];

const categories = [
  { key: "convenience", label: "食費 / コンビニ", group: "食費" },
  { key: "restaurant", label: "食費 / 外食", group: "食費" },
  { key: "supermarket", label: "食費 / スーパー", group: "食費" },
  { key: "cafe", label: "食費 / カフェ", group: "食費" },
  { key: "daily", label: "日用品", group: "日用品" },
  { key: "rent", label: "家賃", group: "家賃" },
  { key: "utilities", label: "光熱費", group: "光熱費" },
  { key: "phone", label: "通信費", group: "通信費" },
  { key: "transportation", label: "交通費", group: "交通費" },
  { key: "fun", label: "娯楽", group: "娯楽" },
  { key: "medical", label: "医療", group: "医療" },
  { key: "other", label: "その他", group: "その他" },
];

const foodCategoryKeys = ["convenience", "restaurant", "supermarket", "cafe"];

const themes = {
  green: {
    label: "グリーン",
    accent: "#1f7a6d",
    accentDark: "#15564d",
    button: "#2f756d",
    warm: "#e36f55",
    bg: "#f4f8f6",
    bgTint: "rgba(31, 122, 109, 0.08)",
  },
  pink: {
    label: "ピンク",
    accent: "#d45d87",
    accentDark: "#9f315d",
    button: "#be5f82",
    warm: "#e68a65",
    bg: "#fbf5f7",
    bgTint: "rgba(212, 93, 135, 0.08)",
  },
  blue: {
    label: "ブルー",
    accent: "#3578b8",
    accentDark: "#24527f",
    button: "#3f72a3",
    warm: "#e0805d",
    bg: "#f3f7fb",
    bgTint: "rgba(53, 120, 184, 0.08)",
  },
  orange: {
    label: "オレンジ",
    accent: "#d97832",
    accentDark: "#9d4e1d",
    button: "#c06d35",
    warm: "#2f8f83",
    bg: "#fbf6f1",
    bgTint: "rgba(217, 120, 50, 0.09)",
  },
  gray: {
    label: "グレー",
    accent: "#64706f",
    accentDark: "#3f4948",
    button: "#5f6a69",
    warm: "#c9795d",
    bg: "#f5f6f6",
    bgTint: "rgba(100, 112, 111, 0.08)",
  },
  yellow: {
    label: "イエロー",
    accent: "#d7b85a",
    accentDark: "#8f7130",
    button: "#b99a4f",
    warm: "#8fae82",
    bg: "#fbf8ef",
    bgTint: "rgba(215, 184, 90, 0.1)",
  },
  purple: {
    label: "パープル",
    accent: "#7b65b7",
    accentDark: "#554184",
    button: "#7160a2",
    warm: "#dc7b60",
    bg: "#f7f4fb",
    bgTint: "rgba(123, 101, 183, 0.08)",
  },
};

const defaultWalletLabels = {
  shared: "共有財布",
  me: "自分",
  partner: "パートナー",
};

const initialState = {
  selectedMonth: currentMonthKey(),
  monthlySettings: {},
  displayNames: {
    me: "",
    partner: "",
  },
  themeColor: "green",
  expenses: [],
};

let state = loadState();
let selectedWallet = "shared";

const elements = {
  sharedBalance: document.querySelector("#sharedBalance"),
  myBalance: document.querySelector("#myBalance"),
  myBalanceName: document.querySelector("#myBalanceName"),
  dailyBudget: document.querySelector("#dailyBudget"),
  monthLabel: document.querySelector("#monthLabel"),
  myIncomeText: document.querySelector("#myIncomeText"),
  partnerIncomeText: document.querySelector("#partnerIncomeText"),
  partnerIncomeField: document.querySelector("#partnerIncomeField"),
  mySharedText: document.querySelector("#mySharedText"),
  partnerSharedText: document.querySelector("#partnerSharedText"),
  prevMonthButton: document.querySelector("#prevMonthButton"),
  nextMonthButton: document.querySelector("#nextMonthButton"),
  setupForm: document.querySelector("#setupForm"),
  myIncome: document.querySelector("#myIncome"),
  partnerIncome: document.querySelector("#partnerIncome"),
  myShared: document.querySelector("#myShared"),
  partnerShared: document.querySelector("#partnerShared"),
  expenseForm: document.querySelector("#expenseForm"),
  expenseText: document.querySelector("#expenseText"),
  walletButtons: document.querySelectorAll(".wallet-option"),
  prediction: document.querySelector("#prediction"),
  spentTotal: document.querySelector("#spentTotal"),
  categoryList: document.querySelector("#categoryList"),
  expenseList: document.querySelector("#expenseList"),
  expenseItemTemplate: document.querySelector("#expenseItemTemplate"),
  clearExpensesButton: document.querySelector("#clearExpensesButton"),
  resetButton: document.querySelector("#resetButton"),
  menuButton: document.querySelector("#menuButton"),
  mainMenu: document.querySelector("#mainMenu"),
  settingsOpenButton: document.querySelector("#settingsOpenButton"),
  settingsModal: document.querySelector("#settingsModal"),
  settingsForm: document.querySelector("#settingsForm"),
  settingsCloseButton: document.querySelector("#settingsCloseButton"),
  settingsCancelButton: document.querySelector("#settingsCancelButton"),
  meDisplayName: document.querySelector("#meDisplayName"),
  partnerDisplayName: document.querySelector("#partnerDisplayName"),
  themeOpenButton: document.querySelector("#themeOpenButton"),
  themeModal: document.querySelector("#themeModal"),
  themeCloseButton: document.querySelector("#themeCloseButton"),
  themeOptions: document.querySelector("#themeOptions"),
  expenseEditModal: document.querySelector("#expenseEditModal"),
  expenseEditForm: document.querySelector("#expenseEditForm"),
  expenseEditCloseButton: document.querySelector("#expenseEditCloseButton"),
  expenseEditCancelButton: document.querySelector("#expenseEditCancelButton"),
  editingExpenseId: document.querySelector("#editingExpenseId"),
  editExpenseName: document.querySelector("#editExpenseName"),
  editExpenseAmount: document.querySelector("#editExpenseAmount"),
  editExpenseCategory: document.querySelector("#editExpenseCategory"),
  editExpenseWallet: document.querySelector("#editExpenseWallet"),
};

function loadState() {
  const saved = readStorage();
  if (!saved) return createInitialState();

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return createInitialState();
  }
}

function createInitialState() {
  const month = currentMonthKey();
  return {
    ...initialState,
    selectedMonth: month,
    monthlySettings: {
      [month]: createDefaultMonthSettings(),
    },
    displayNames: { ...initialState.displayNames },
    expenses: [],
  };
}

function saveState() {
  state = normalizeState(state);
  writeStorage(JSON.stringify(state));
}

function readStorage() {
  if (!canUseLocalStorage()) return null;

  for (const key of STORAGE_KEYS) {
    const saved = localStorage.getItem(key);
    if (saved) return saved;
  }

  return null;
}

function writeStorage(value) {
  if (!canUseLocalStorage()) return false;

  try {
    localStorage.setItem(STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

function clearStorage() {
  if (!canUseLocalStorage()) return;

  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function canUseLocalStorage() {
  try {
    const testKey = `${STORAGE_KEY}-test`;
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function normalizeState(savedState) {
  const selectedMonth = normalizeMonthKey(savedState?.selectedMonth) || currentMonthKey();
  const monthlySettings = normalizeMonthlySettings(savedState?.monthlySettings);

  if (Object.keys(monthlySettings).length === 0) {
    monthlySettings[currentMonthKey()] = normalizeMonthSettings(savedState);
  }

  if (!monthlySettings[selectedMonth]) {
    monthlySettings[selectedMonth] = createDefaultMonthSettings();
  }

  return {
    selectedMonth,
    monthlySettings,
    displayNames: normalizeDisplayNames(savedState?.displayNames),
    themeColor: themes[savedState?.themeColor] ? savedState.themeColor : "green",
    expenses: Array.isArray(savedState?.expenses)
      ? savedState.expenses.map(normalizeExpense).filter(Boolean)
      : [],
  };
}

function createDefaultMonthSettings() {
  return {
    myIncome: 0,
    partnerIncome: 0,
    myShared: 0,
    partnerShared: 0,
  };
}

function normalizeMonthlySettings(monthlySettings) {
  if (!monthlySettings || typeof monthlySettings !== "object") return {};

  return Object.entries(monthlySettings).reduce((settings, [month, values]) => {
    const monthKey = normalizeMonthKey(month);
    if (monthKey) settings[monthKey] = normalizeMonthSettings(values);
    return settings;
  }, {});
}

function normalizeMonthSettings(settings) {
  return {
    myIncome: toSafeNumber(settings?.myIncome),
    partnerIncome: toSafeNumber(settings?.partnerIncome),
    myShared: toSafeNumber(settings?.myShared),
    partnerShared: toSafeNumber(settings?.partnerShared),
  };
}

function currentMonthKey() {
  return monthKeyFromDate(new Date());
}

function monthKeyFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function normalizeMonthKey(value) {
  return /^\d{4}-\d{2}$/.test(String(value || "")) ? String(value) : "";
}

function selectedMonthDate() {
  const [year, month] = state.selectedMonth.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function selectedMonthLabel() {
  const date = selectedMonthDate();
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

function getSelectedMonthSettings() {
  if (!state.monthlySettings[state.selectedMonth]) {
    state.monthlySettings[state.selectedMonth] = createDefaultMonthSettings();
  }

  return state.monthlySettings[state.selectedMonth];
}

function normalizeDisplayNames(displayNames) {
  return {
    me: normalizeDisplayName(displayNames?.me),
    partner: normalizeDisplayName(displayNames?.partner),
  };
}

function normalizeDisplayName(value) {
  return String(value || "").trim().slice(0, 20);
}

function toSafeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function normalizeExpense(expense) {
  const amount = toSafeNumber(expense?.amount);
  if (!amount) return null;

  return {
    id: expense?.id || createExpenseId(),
    name: String(expense?.name || "支出"),
    amount,
    category: categories.some((category) => category.key === expense?.category)
      ? expense.category
      : "other",
    wallet: normalizeWallet(expense?.wallet),
    createdAt: expense?.createdAt || new Date().toISOString(),
  };
}

function normalizeWallet(wallet) {
  const walletMap = {
    shared: "shared",
    me: "me",
    partner: "partner",
    共有財布: "shared",
    わたし: "me",
    私: "me",
    自分: "me",
    パートナー: "partner",
  };

  return walletMap[wallet] || "shared";
}

function createExpenseId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function yen(value) {
  return `${Math.round(value).toLocaleString("ja-JP")}円`;
}

function spentFrom(wallet, monthKey = state.selectedMonth) {
  return state.expenses
    .filter((expense) => expense.wallet === wallet && expenseMatchesMonth(expense, monthKey))
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function expenseMatchesMonth(expense, monthKey) {
  const date = new Date(expense.createdAt);
  if (Number.isNaN(date.getTime())) return monthKey === state.selectedMonth;

  return monthKeyFromDate(date) === monthKey;
}

function monthlyExpenses() {
  return state.expenses.filter((expense) => isSelectedMonth(expense.createdAt));
}

function isSelectedMonth(dateText) {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return true;

  return monthKeyFromDate(date) === state.selectedMonth;
}

function getBalances() {
  const settings = getSelectedMonthSettings();
  const sharedStart = Number(settings.myShared) + Number(settings.partnerShared);
  const myStart = Number(settings.myIncome) - Number(settings.myShared);
  const partnerStart = Number(settings.partnerIncome) - Number(settings.partnerShared);

  return {
    shared: sharedStart - spentFrom("shared", state.selectedMonth),
    my: myStart - spentFrom("me", state.selectedMonth),
    partner: partnerStart - spentFrom("partner", state.selectedMonth),
  };
}

function daysLeftInMonth() {
  const today = new Date();
  const monthDate = selectedMonthDate();
  const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

  if (state.selectedMonth === currentMonthKey()) {
    return Math.max(1, lastDay - today.getDate() + 1);
  }

  return lastDay;
}

function parseExpense(text) {
  const amountMatch = text.match(/([0-9０-９,，]+)\s*円?/);
  const amount = amountMatch ? Number(toHalfWidth(amountMatch[1]).replace(/[，,]/g, "")) : 0;
  const name = text.replace(amountMatch?.[0] || "", "").trim() || "支出";
  const normalized = toHalfWidth(text).toLowerCase();
  const category = detectCategory(normalized);
  const wallet = selectedWallet;

  return { name, amount, category, wallet };
}

function toHalfWidth(text) {
  return text.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}

function detectCategory(text) {
  const rules = [
    ["convenience", ["セブン", "seven", "ローソン", "lawson", "ファミマ", "familymart", "コンビニ"]],
    ["cafe", ["スタバ", "starbucks", "ドトール", "タリーズ", "コメダ", "カフェ", "喫茶"]],
    ["restaurant", ["外食", "ランチ", "夕食", "ごはん", "マック", "すき家", "レストラン", "焼肉", "寿司", "ラーメン"]],
    ["supermarket", ["スーパー", "イオン", "西友", "ライフ", "オーケー", "まいばす", "食材"]],
    ["daily", ["日用品", "薬局", "ドラッグ", "洗剤", "ティッシュ", "シャンプー"]],
    ["rent", ["家賃", "賃料"]],
    ["utilities", ["光熱", "電気", "電力", "ガス", "水道", "水道代"]],
    ["phone", ["通信", "スマホ", "携帯", "wifi", "wi-fi", "ネット"]],
    ["transportation", ["交通", "電車", "バス", "タクシー", "suica", "pasmo", "定期", "ガソリン"]],
    [
      "fun",
      [
        "映画",
        "シネマ",
        "cinema",
        "カラオケ",
        "歌広場",
        "まねきねこ",
        "ラウンドワン",
        "round1",
        "ボウリング",
        "ボーリング",
        "ゲーム",
        "ゲーセン",
        "娯楽",
        "遊び",
        "旅行",
        "デート",
        "ライブ",
        "イベント",
      ],
    ],
    ["medical", ["医療", "病院", "クリニック", "歯医者", "処方", "薬代"]],
  ];

  const match = rules.find(([, words]) => words.some((word) => text.includes(word)));
  return match ? match[0] : "other";
}

function categoryLabel(key) {
  return categories.find((category) => category.key === key)?.label || "その他";
}

function walletLabel(key) {
  const wallet = normalizeWallet(key);
  if (wallet === "shared") return defaultWalletLabels.shared;

  return state.displayNames[wallet] || defaultWalletLabels[wallet];
}

function categoryShortLabel(key) {
  const label = categoryLabel(key);
  return label.includes(" / ") ? label.split(" / ")[1] : label;
}

function formatExpenseDate(dateText) {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return "日付なし";

  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function createExpenseDateForSelectedMonth() {
  const now = new Date();

  if (state.selectedMonth === currentMonthKey()) {
    return now.toISOString();
  }

  const [year, month] = state.selectedMonth.split("-").map(Number);
  return new Date(year, month - 1, 1, 12, 0, 0).toISOString();
}

function render() {
  const balances = getBalances();
  const currentMonthVisibleExpenses = monthlyExpenses().filter((expense) => expense.wallet !== "partner");
  const currentMonthSharedExpenses = currentMonthVisibleExpenses.filter((expense) => expense.wallet === "shared");
  const currentMonthMyExpenses = currentMonthVisibleExpenses.filter((expense) => expense.wallet === "me");
  const sharedSpent = currentMonthSharedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const mySpent = currentMonthMyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const visibleSpent = sharedSpent + mySpent;
  const settings = getSelectedMonthSettings();

  elements.sharedBalance.textContent = yen(balances.shared);
  elements.myBalance.textContent = yen(balances.my);
  elements.dailyBudget.textContent = yen(balances.shared / daysLeftInMonth());
  elements.spentTotal.textContent = `${yen(visibleSpent)} 使用`;
  elements.monthLabel.textContent = selectedMonthLabel();

  elements.myIncome.value = settings.myIncome || "";
  elements.partnerIncome.value = settings.partnerIncome || "";
  elements.myShared.value = settings.myShared || "";
  elements.partnerShared.value = settings.partnerShared || "";

  renderDisplayNames();
  applyTheme();
  renderWalletSelector();
  renderThemeOptions();
  renderEditOptions();
  renderCategories(currentMonthVisibleExpenses, sharedSpent, mySpent);
  renderExpenses();
}

function applyTheme() {
  const theme = themes[state.themeColor] || themes.green;
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-dark", theme.accentDark);
  document.documentElement.style.setProperty("--button-accent", theme.button);
  document.documentElement.style.setProperty("--warm", theme.warm);
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--bg-tint", theme.bgTint);
}

function renderDisplayNames() {
  const meName = walletLabel("me");
  const partnerName = walletLabel("partner");

  elements.myBalanceName.textContent = meName;
  elements.myIncomeText.textContent = `${meName}の収入`;
  elements.partnerIncomeText.textContent = `${partnerName}の収入`;
  elements.mySharedText.textContent = `${meName}が共有財布へ`;
  elements.partnerSharedText.textContent = `${partnerName}が共有財布へ`;
  elements.meDisplayName.value = state.displayNames.me;
  elements.partnerDisplayName.value = state.displayNames.partner;
}

function renderWalletSelector() {
  elements.walletButtons.forEach((button) => {
    if (button.dataset.wallet === "partner") {
      button.hidden = true;
      return;
    }

    button.textContent = walletLabel(button.dataset.wallet);
    button.classList.toggle("is-active", button.dataset.wallet === selectedWallet);
  });
}

function renderThemeOptions() {
  elements.themeOptions.innerHTML = Object.entries(themes)
    .map(
      ([key, theme]) => `
        <button class="theme-option ${state.themeColor === key ? "is-active" : ""}" type="button" data-theme="${key}">
          <span class="theme-swatch" style="--swatch: ${theme.accent}"></span>
          <span>${theme.label}</span>
        </button>
      `,
    )
    .join("");

  elements.themeOptions.querySelectorAll(".theme-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.themeColor = themes[button.dataset.theme] ? button.dataset.theme : "green";
      saveState();
      applyTheme();
      renderThemeOptions();
    });
  });
}

function renderCategories(currentMonthVisibleExpenses, sharedSpent, mySpent) {
  elements.categoryList.innerHTML = "";

  const visibleSpent = sharedSpent + mySpent;
  renderMonthlySummary(visibleSpent, sharedSpent, mySpent);
  renderFoodSummary(currentMonthVisibleExpenses);

  categories
    .filter((category) => !foodCategoryKeys.includes(category.key))
    .forEach((category) => {
      const total = totalByCategory(currentMonthVisibleExpenses, category.key);
      const percentage = visibleSpent > 0 ? Math.min(100, (total / visibleSpent) * 100) : 0;

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

function renderMonthlySummary(visibleSpent, sharedSpent, mySpent) {
  const summary = document.createElement("div");
  summary.className = "monthly-summary";
  summary.innerHTML = `
    <div class="monthly-total">
      <span>この月の支出合計</span>
      <strong>${yen(visibleSpent)}</strong>
    </div>
    <div class="monthly-breakdown">
      <div>
        <span>共有財布</span>
        <strong>${yen(sharedSpent)}</strong>
      </div>
      <div>
        <span>${walletLabel("me")}</span>
        <strong>${yen(mySpent)}</strong>
      </div>
    </div>
  `;
  elements.categoryList.append(summary);
}

function renderFoodSummary(currentMonthSharedExpenses) {
  const foodTotal = foodCategoryKeys.reduce(
    (sum, key) => sum + totalByCategory(currentMonthSharedExpenses, key),
    0,
  );
  const summary = document.createElement("div");
  summary.className = "food-summary";
  summary.innerHTML = `
    <div class="food-total">
      <span>食費合計</span>
      <strong>${yen(foodTotal)}</strong>
    </div>
    <div class="food-breakdown">
      ${foodCategoryKeys
        .map(
          (key) => `
            <div>
              <span>${categoryShortLabel(key)}</span>
              <strong>${yen(totalByCategory(currentMonthSharedExpenses, key))}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
  elements.categoryList.append(summary);
}

function totalByCategory(expenses, categoryKey) {
  return expenses
    .filter((expense) => expense.category === categoryKey)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function renderExpenses() {
  elements.expenseList.innerHTML = "";

  const visibleExpenses = state.expenses.filter(
    (expense) => expense.wallet !== "partner" && expenseMatchesMonth(expense, state.selectedMonth),
  );

  if (visibleExpenses.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "まだ支出はありません";
    elements.expenseList.append(empty);
    return;
  }

  const sortedExpenses = [...visibleExpenses].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  sortedExpenses.forEach((expense) => {
    const item = elements.expenseItemTemplate.content.firstElementChild.cloneNode(true);
    item.querySelector(".expense-title").textContent = expense.name;
    item.querySelector(".expense-meta").textContent =
      `${formatExpenseDate(expense.createdAt)} / ${categoryLabel(expense.category)} / ${walletLabel(expense.wallet)}`;
    item.querySelector(".expense-amount").textContent = yen(expense.amount);
    item.querySelector(".edit-button").addEventListener("click", () => {
      openExpenseEditor(expense.id);
    });
    item.querySelector(".delete-button").addEventListener("click", () => {
      state.expenses = state.expenses.filter((itemExpense) => itemExpense.id !== expense.id);
      saveState();
      render();
    });
    elements.expenseList.append(item);
  });
}

function handleSetupInput(event) {
  const target = event.target;
  if (!target.id) return;

  getSelectedMonthSettings()[target.id] = Number(toHalfWidth(target.value).replace(/[^\d]/g, ""));
  saveState();
  render();
}

function renderEditOptions() {
  elements.editExpenseCategory.innerHTML = categories
    .map((category) => `<option value="${category.key}">${category.label}</option>`)
    .join("");
  elements.editExpenseWallet.querySelector('option[value="me"]').textContent = walletLabel("me");
}

function openExpenseEditor(expenseId) {
  const expense = state.expenses.find((item) => item.id === expenseId);
  if (!expense) return;

  elements.editingExpenseId.value = expense.id;
  elements.editExpenseName.value = expense.name;
  elements.editExpenseAmount.value = expense.amount;
  elements.editExpenseCategory.value = expense.category;
  elements.editExpenseWallet.value = expense.wallet === "partner" ? "shared" : expense.wallet;
  elements.expenseEditModal.hidden = false;
  elements.editExpenseName.focus();
}

function closeExpenseEditor() {
  elements.expenseEditModal.hidden = true;
}

elements.setupForm.addEventListener("input", handleSetupInput);
elements.setupForm.addEventListener("change", handleSetupInput);

elements.prevMonthButton.addEventListener("click", () => {
  moveSelectedMonth(-1);
});

elements.nextMonthButton.addEventListener("click", () => {
  moveSelectedMonth(1);
});

function moveSelectedMonth(offset) {
  const date = selectedMonthDate();
  date.setMonth(date.getMonth() + offset);
  state.selectedMonth = monthKeyFromDate(date);
  getSelectedMonthSettings();
  saveState();
  render();
}

elements.menuButton.addEventListener("click", () => {
  const isOpen = elements.mainMenu.hidden;
  elements.mainMenu.hidden = !isOpen;
  elements.menuButton.setAttribute("aria-expanded", String(isOpen));
});

elements.settingsOpenButton.addEventListener("click", () => {
  elements.mainMenu.hidden = true;
  elements.menuButton.setAttribute("aria-expanded", "false");
  openSettings();
});

elements.themeOpenButton.addEventListener("click", () => {
  elements.mainMenu.hidden = true;
  elements.menuButton.setAttribute("aria-expanded", "false");
  openTheme();
});

elements.settingsCloseButton.addEventListener("click", closeSettings);
elements.settingsCancelButton.addEventListener("click", closeSettings);
elements.settingsModal.addEventListener("click", (event) => {
  if (event.target === elements.settingsModal) closeSettings();
});

elements.themeCloseButton.addEventListener("click", closeTheme);
elements.themeModal.addEventListener("click", (event) => {
  if (event.target === elements.themeModal) closeTheme();
});

function openSettings() {
  elements.meDisplayName.value = state.displayNames.me;
  elements.partnerDisplayName.value = state.displayNames.partner;
  elements.settingsModal.hidden = false;
  elements.meDisplayName.focus();
}

function closeSettings() {
  elements.settingsModal.hidden = true;
}

function openTheme() {
  renderThemeOptions();
  elements.themeModal.hidden = false;
}

function closeTheme() {
  elements.themeModal.hidden = true;
}

elements.settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.displayNames.me = normalizeDisplayName(elements.meDisplayName.value);
  state.displayNames.partner = normalizeDisplayName(elements.partnerDisplayName.value);
  saveState();
  closeSettings();
  render();
});

elements.expenseEditCloseButton.addEventListener("click", closeExpenseEditor);
elements.expenseEditCancelButton.addEventListener("click", closeExpenseEditor);
elements.expenseEditModal.addEventListener("click", (event) => {
  if (event.target === elements.expenseEditModal) closeExpenseEditor();
});

elements.expenseEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expenseId = elements.editingExpenseId.value;
  const amount = Number(toHalfWidth(elements.editExpenseAmount.value).replace(/[^\d]/g, ""));
  const name = elements.editExpenseName.value.trim() || "支出";
  const category = elements.editExpenseCategory.value;
  const wallet = normalizeWallet(elements.editExpenseWallet.value);

  if (!amount) return;

  state.expenses = state.expenses.map((expense) =>
    expense.id === expenseId
      ? {
          ...expense,
          name,
          amount,
          category: categories.some((item) => item.key === category) ? category : "other",
          wallet: wallet === "partner" ? "shared" : wallet,
        }
      : expense,
  );
  saveState();
  closeExpenseEditor();
  render();
});

elements.walletButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedWallet = normalizeWallet(button.dataset.wallet);
    if (selectedWallet === "partner") selectedWallet = "shared";
    renderWalletSelector();
    updatePrediction();
  });
});

elements.expenseText.addEventListener("input", () => {
  updatePrediction();
});

function updatePrediction() {
  const text = elements.expenseText.value.trim();
  if (!text) {
    elements.prediction.textContent = "入力すると自動で分類します";
    return;
  }

  const expense = parseExpense(text);
  elements.prediction.textContent =
    `${categoryLabel(expense.category)} / ${walletLabel(expense.wallet)} / ${yen(expense.amount)}`;
}

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
    id: createExpenseId(),
    createdAt: createExpenseDateForSelectedMonth(),
  });
  elements.expenseText.value = "";
  elements.prediction.textContent = "入力すると自動で分類します";
  saveState();
  render();
});

elements.clearExpensesButton.addEventListener("click", () => {
  state.expenses = state.expenses.filter((expense) => !expenseMatchesMonth(expense, state.selectedMonth));
  saveState();
  render();
});

elements.resetButton.addEventListener("click", () => {
  state = createInitialState();
  clearStorage();
  render();
});

render();
