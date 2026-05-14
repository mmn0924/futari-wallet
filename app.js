const STORAGE_KEY = "couple-budget-simple-v1";
const WINDOW_STORAGE_KEY = `__${STORAGE_KEY}__`;
const STORAGE_KEYS = [STORAGE_KEY];
const BACKUP_APP_ID = "couple-budget-simple";
const ADD_SUBCATEGORY_OPTION = "__add_subcategory__";

const categoryGroups = [
  {
    key: "food",
    label: "食費",
    children: [
      { key: "convenience", label: "コンビニ", words: ["セブン", "セブンイレブン", "7-eleven", "seven", "ローソン", "lawson", "ファミマ", "ファミリーマート", "familymart", "ミニストップ", "ministop", "デイリーヤマザキ", "コンビニ"] },
      { key: "restaurant", label: "外食", words: ["外食", "ランチ", "夕食", "ごはん", "マック", "マクド", "マクドナルド", "mcdonald", "モス", "モスバーガー", "ケンタ", "kfc", "バーガーキング", "バーキン", "bk", "すき家", "吉野家", "松屋", "サイゼ", "サイゼリヤ", "ガスト", "バーミヤン", "ココイチ", "レストラン", "焼肉", "寿司", "スシロー", "くら寿司", "はま寿司", "ラーメン"] },
      { key: "supermarket", label: "スーパー", words: ["スーパー", "イオン", "aeon", "西友", "seiyu", "ライフ", "オーケー", "okストア", "まいばす", "まいばすけっと", "業務スーパー", "業スー", "マルエツ", "サミット", "ヨーク", "成城石井", "コープ", "生協", "食材"] },
      { key: "cafe", label: "カフェ", words: ["スタバ", "starbucks", "ドトール", "doutor", "タリーズ", "tully", "コメダ", "コメダ珈琲", "ベローチェ", "サンマルク", "カフェ", "喫茶"] },
      { key: "delivery", label: "デリバリー", words: ["uber", "uber eats", "ubereats", "ウーバー", "ウーバーイーツ", "出前", "出前館", "デリバリー", "wolt", "ウォルト", "menu"] },
    ],
  },
  {
    key: "daily",
    label: "日用品",
    children: [
      { key: "consumables", label: "消耗品", words: ["日用品", "消耗品", "ドラッグ", "薬局", "マツキヨ", "マツモトキヨシ", "ウエルシア", "welcia", "スギ薬局", "ツルハ", "ココカラファイン", "サンドラッグ", "ダイソー", "daiso", "セリア", "seria", "キャンドゥ", "cando", "ニトリ", "無印", "muji", "シャンプー", "ティッシュ", "トイレットペーパー"] },
      { key: "cleaning", label: "掃除/洗剤", words: ["洗剤", "掃除", "クリーナー", "スポンジ", "柔軟剤", "漂白剤", "ゴミ袋", "キッチンペーパー"] },
      { key: "beauty", label: "美容", words: ["美容", "コスメ", "化粧", "メイク", "スキンケア", "化粧水", "乳液", "日焼け止め"] },
    ],
  },
  {
    key: "housing",
    label: "住居",
    children: [
      { key: "rent", label: "家賃", words: ["家賃", "賃料"] },
      { key: "maintenance", label: "管理費", words: ["管理費", "共益費"] },
    ],
  },
  {
    key: "utilities",
    label: "通信・光熱費",
    children: [
      { key: "mobile", label: "スマホ", words: ["スマホ", "携帯", "モバイル", "docomo", "ドコモ", "au", "kddi", "softbank", "ソフトバンク", "楽天モバイル", "rakuten mobile", "ahamo", "povo", "linemo", "uq", "ymobile", "ワイモバイル"] },
      { key: "wifi", label: "Wi-Fi", words: ["wifi", "wi-fi", "wi fi", "ワイファイ", "ネット", "インターネット", "光回線", "フレッツ", "nuro", "jcom", "j:com", "biglobe", "ocn", "ぷらら"] },
      { key: "electricity", label: "電気", words: ["電気", "電力", "東京電力", "tepco", "関西電力", "中部電力", "電気代"] },
      { key: "gas", label: "ガス", words: ["ガス", "東京ガス", "大阪ガス", "ガス代"] },
      { key: "water", label: "水道", words: ["水道", "水道代", "上下水道"] },
    ],
  },
  {
    key: "transportation",
    label: "交通費",
    children: [
      { key: "train", label: "電車", words: ["電車", "suica", "pasmo", "icoca", "manaca", "定期", "jr", "東京メトロ", "メトロ", "都営", "地下鉄", "小田急", "京王", "東急", "西武", "東武", "京急", "京成"] },
      { key: "bus", label: "バス", words: ["バス", "高速バス", "都バス"] },
      { key: "taxi", label: "タクシー", words: ["タクシー", "taxi", "go taxi", "uber taxi", "s ride", "エスライド"] },
      { key: "gasoline", label: "ガソリン", words: ["ガソリン", "給油", "eneos", "エネオス", "出光", "idemitsu", "コスモ石油", "shell"] },
      { key: "parking", label: "駐車場", words: ["駐車", "駐車場", "パーキング", "parking", "タイムズ", "times", "三井のリパーク", "リパーク"] },
    ],
  },
  {
    key: "hobby",
    label: "趣味・娯楽",
    children: [
      { key: "movie", label: "映画", words: ["映画", "シネマ", "cinema", "toho", "tohoシネマズ", "イオンシネマ", "ユナイテッドシネマ", "109シネマズ", "netflix", "ネトフリ", "hulu", "disney+", "youtube premium", "youtubeプレミアム", "アマプラ", "prime video", "u-next"] },
      { key: "karaoke", label: "カラオケ", words: ["カラオケ", "歌広場", "まねきねこ", "ビッグエコー", "big echo", "ジャンカラ", "カラ館", "カラオケ館"] },
      { key: "travel", label: "旅行", words: ["旅行", "ホテル", "旅館", "航空券"] },
      { key: "game", label: "ゲーム", words: ["ゲーム", "ゲーセン", "ボウリング", "ボーリング", "ラウンドワン", "round1", "switch", "nintendo", "任天堂", "playstation", "ps5", "steam", "app store", "google play"] },
      { key: "book", label: "本", words: ["本", "書籍", "漫画", "マンガ", "kindle", "キンドル", "ブックオフ", "bookoff", "紀伊國屋", "丸善", "ジュンク堂"] },
      { key: "oshi", label: "推し活", words: ["推し", "ライブ", "イベント", "グッズ", "チケット", "ぴあ", "ローチケ", "イープラス", "eplus"] },
      { key: "clothes", label: "服", words: ["服", "洋服", "衣服", "アパレル", "ユニクロ", "uniqlo", "gu", "ジーユー", "zara", "h&m", "しまむら", "無印良品"] },
      { key: "beauty", label: "美容", words: ["美容院", "美容室", "ヘアサロン", "サロン", "ネイル", "まつげ", "マツエク", "カット", "カラー"] },
    ],
  },
  {
    key: "medical",
    label: "医療",
    children: [
      { key: "hospital", label: "病院", words: ["病院", "クリニック", "医療"] },
      { key: "medicine", label: "薬", words: ["薬", "処方", "薬代"] },
      { key: "dentist", label: "歯医者", words: ["歯医者", "歯科"] },
    ],
  },
  {
    key: "other",
    label: "その他",
    children: [
      { key: "gift", label: "プレゼント", words: ["プレゼント", "ギフト", "贈り物"] },
      { key: "work", label: "仕事", words: ["仕事", "会社", "経費", "文具"] },
      { key: "misc", label: "雑費", words: ["雑費", "その他"] },
      { key: "uncategorized", label: "未分類", words: [] },
    ],
  },
];
const categories = categoryGroups.map(({ key, label }) => ({ key, label }));

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
  customSubcategories: {},
  fixedCosts: [],
  expenses: [],
};

let state = loadState();
let selectedWallet = "shared";
let expandedCategories = {
  food: false,
  fixed: false,
};

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
  monthListButton: document.querySelector("#monthListButton"),
  monthList: document.querySelector("#monthList"),
  setupForm: document.querySelector("#setupForm"),
  myIncome: document.querySelector("#myIncome"),
  partnerIncome: document.querySelector("#partnerIncome"),
  myShared: document.querySelector("#myShared"),
  partnerShared: document.querySelector("#partnerShared"),
  expenseForm: document.querySelector("#expenseForm"),
  expenseText: document.querySelector("#expenseText"),
  expenseFixedToggle: document.querySelector("#expenseFixedToggle"),
  expenseSuggestions: document.querySelector("#expenseSuggestions"),
  expenseSuggestionLabel: document.querySelector("#expenseSuggestionLabel"),
  expenseSuggestionList: document.querySelector("#expenseSuggestionList"),
  walletButtons: document.querySelectorAll(".wallet-option"),
  prediction: document.querySelector("#prediction"),
  spentTotal: document.querySelector("#spentTotal"),
  dailyExpenseSummary: document.querySelector("#dailyExpenseSummary"),
  dailyExpenseList: document.querySelector("#dailyExpenseList"),
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
  backupOpenButton: document.querySelector("#backupOpenButton"),
  backupModal: document.querySelector("#backupModal"),
  backupCloseButton: document.querySelector("#backupCloseButton"),
  exportDataButton: document.querySelector("#exportDataButton"),
  importDataButton: document.querySelector("#importDataButton"),
  importDataInput: document.querySelector("#importDataInput"),
  budgetModal: document.querySelector("#budgetModal"),
  budgetForm: document.querySelector("#budgetForm"),
  budgetCloseButton: document.querySelector("#budgetCloseButton"),
  budgetClearButton: document.querySelector("#budgetClearButton"),
  editingBudgetCategory: document.querySelector("#editingBudgetCategory"),
  budgetCategoryName: document.querySelector("#budgetCategoryName"),
  categoryBudgetInput: document.querySelector("#categoryBudgetInput"),
  fixedCostOpenButton: document.querySelector("#fixedCostOpenButton"),
  fixedCostModal: document.querySelector("#fixedCostModal"),
  fixedCostCloseButton: document.querySelector("#fixedCostCloseButton"),
  fixedCostStatus: document.querySelector("#fixedCostStatus"),
  fixedCostForm: document.querySelector("#fixedCostForm"),
  editingFixedCostId: document.querySelector("#editingFixedCostId"),
  fixedCostName: document.querySelector("#fixedCostName"),
  fixedCostAmount: document.querySelector("#fixedCostAmount"),
  fixedCostCategory: document.querySelector("#fixedCostCategory"),
  fixedCostSubcategory: document.querySelector("#fixedCostSubcategory"),
  fixedCostWallet: document.querySelector("#fixedCostWallet"),
  fixedCostCancelButton: document.querySelector("#fixedCostCancelButton"),
  fixedCostList: document.querySelector("#fixedCostList"),
  expenseEditModal: document.querySelector("#expenseEditModal"),
  expenseEditForm: document.querySelector("#expenseEditForm"),
  expenseEditCloseButton: document.querySelector("#expenseEditCloseButton"),
  expenseEditCancelButton: document.querySelector("#expenseEditCancelButton"),
  editingExpenseId: document.querySelector("#editingExpenseId"),
  editExpenseName: document.querySelector("#editExpenseName"),
  editExpenseAmount: document.querySelector("#editExpenseAmount"),
  editExpenseCategory: document.querySelector("#editExpenseCategory"),
  editExpenseSubcategory: document.querySelector("#editExpenseSubcategory"),
  editExpenseWallet: document.querySelector("#editExpenseWallet"),
  editExpenseFixedToggle: document.querySelector("#editExpenseFixedToggle"),
};

function ensureBackupElements() {
  if (!elements.backupOpenButton && elements.mainMenu) {
    elements.backupOpenButton = document.createElement("button");
    elements.backupOpenButton.id = "backupOpenButton";
    elements.backupOpenButton.type = "button";
    elements.backupOpenButton.textContent = "バックアップ";
    elements.mainMenu.append(elements.backupOpenButton);
  }

  if (!elements.backupModal) {
    const modal = document.createElement("div");
    modal.className = "settings-backdrop";
    modal.id = "backupModal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "backupTitle");
    modal.hidden = true;
    modal.innerHTML = `
      <section class="settings-panel">
        <div class="settings-head">
          <h2 id="backupTitle">バックアップ</h2>
          <button class="icon-button" id="backupCloseButton" type="button" aria-label="閉じる" title="閉じる">
            ×
          </button>
        </div>
        <div class="settings-actions">
          <button class="save-button" id="exportDataButton" type="button">データを書き出す</button>
          <button class="text-button" id="importDataButton" type="button">データを読み込む</button>
        </div>
        <input id="importDataInput" type="file" accept="application/json,.json" hidden />
      </section>
    `;
    document.body.append(modal);
  }

  elements.backupModal = document.querySelector("#backupModal");
  elements.backupCloseButton = document.querySelector("#backupCloseButton");
  elements.exportDataButton = document.querySelector("#exportDataButton");
  elements.importDataButton = document.querySelector("#importDataButton");
  elements.importDataInput = document.querySelector("#importDataInput");

  if (
    !elements.backupCloseButton ||
    !elements.exportDataButton ||
    !elements.importDataButton ||
    !elements.importDataInput
  ) {
    elements.backupModal.innerHTML = `
      <section class="settings-panel">
        <div class="settings-head">
          <h2 id="backupTitle">バックアップ</h2>
          <button class="icon-button" id="backupCloseButton" type="button" aria-label="閉じる" title="閉じる">
            ×
          </button>
        </div>
        <div class="settings-actions">
          <button class="save-button" id="exportDataButton" type="button">データを書き出す</button>
          <button class="text-button" id="importDataButton" type="button">データを読み込む</button>
        </div>
        <input id="importDataInput" type="file" accept="application/json,.json" hidden />
      </section>
    `;
    elements.backupCloseButton = document.querySelector("#backupCloseButton");
    elements.exportDataButton = document.querySelector("#exportDataButton");
    elements.importDataButton = document.querySelector("#importDataButton");
    elements.importDataInput = document.querySelector("#importDataInput");
  }
}

function ensureEditSubcategoryElement() {
  if (elements.editExpenseSubcategory) return;

  const categoryLabelElement = elements.editExpenseCategory?.closest("label");
  if (!categoryLabelElement) return;

  const label = document.createElement("label");
  label.innerHTML = `
    <span>内訳</span>
    <select id="editExpenseSubcategory"></select>
  `;
  categoryLabelElement.after(label);
  elements.editExpenseSubcategory = document.querySelector("#editExpenseSubcategory");
}

function ensureBudgetElements() {
  if (elements.budgetModal) return;

  const modal = document.createElement("div");
  modal.className = "settings-backdrop";
  modal.id = "budgetModal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "budgetTitle");
  modal.hidden = true;
  modal.innerHTML = `
    <section class="settings-panel">
      <div class="settings-head">
        <h2 id="budgetTitle">予算設定</h2>
        <button class="icon-button" id="budgetCloseButton" type="button" aria-label="閉じる" title="閉じる">×</button>
      </div>
      <form class="settings-form" id="budgetForm">
        <input id="editingBudgetCategory" type="hidden" />
        <label>
          <span id="budgetCategoryName">カテゴリ</span>
          <input id="categoryBudgetInput" inputmode="numeric" pattern="[0-9]*" placeholder="例 30000" />
        </label>
        <div class="settings-actions">
          <button class="text-button" id="budgetClearButton" type="button">未設定に戻す</button>
          <button class="save-button" type="submit">保存</button>
        </div>
      </form>
    </section>
  `;
  document.body.append(modal);

  elements.budgetModal = document.querySelector("#budgetModal");
  elements.budgetForm = document.querySelector("#budgetForm");
  elements.budgetCloseButton = document.querySelector("#budgetCloseButton");
  elements.budgetClearButton = document.querySelector("#budgetClearButton");
  elements.editingBudgetCategory = document.querySelector("#editingBudgetCategory");
  elements.budgetCategoryName = document.querySelector("#budgetCategoryName");
  elements.categoryBudgetInput = document.querySelector("#categoryBudgetInput");
}

function ensureFixedCostElements() {
  if (!elements.fixedCostModal) {
    const modal = document.createElement("div");
    modal.className = "settings-backdrop";
    modal.id = "fixedCostModal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "fixedCostTitle");
    modal.hidden = true;
    modal.innerHTML = `
      <section class="settings-panel">
        <div class="settings-head">
          <h2 id="fixedCostTitle">固定費</h2>
          <button class="icon-button" id="fixedCostCloseButton" type="button" aria-label="閉じる" title="閉じる">×</button>
        </div>
        <p class="fixed-cost-status" id="fixedCostStatus"></p>
        <form class="settings-form" id="fixedCostForm">
          <input id="editingFixedCostId" type="hidden" />
          <label><span>名称</span><input id="fixedCostName" autocomplete="off" placeholder="例 家賃" /></label>
          <label><span>金額</span><input id="fixedCostAmount" inputmode="numeric" pattern="[0-9]*" placeholder="例 90000" /></label>
          <label><span>カテゴリ</span><select id="fixedCostCategory"></select></label>
          <label><span>内訳</span><select id="fixedCostSubcategory"></select></label>
          <label><span>支払い元</span><select id="fixedCostWallet"><option value="shared">共有財布</option><option value="me">自分</option></select></label>
          <div class="settings-actions">
            <button class="text-button" id="fixedCostCancelButton" type="button">新規に戻す</button>
            <button class="save-button" type="submit">保存</button>
          </div>
        </form>
        <div class="fixed-cost-list" id="fixedCostList"></div>
      </section>
    `;
    document.body.append(modal);
  }

  elements.fixedCostModal = document.querySelector("#fixedCostModal");
  elements.fixedCostCloseButton = document.querySelector("#fixedCostCloseButton");
  elements.fixedCostStatus = document.querySelector("#fixedCostStatus");
  elements.fixedCostForm = document.querySelector("#fixedCostForm");
  elements.editingFixedCostId = document.querySelector("#editingFixedCostId");
  elements.fixedCostName = document.querySelector("#fixedCostName");
  elements.fixedCostAmount = document.querySelector("#fixedCostAmount");
  elements.fixedCostCategory = document.querySelector("#fixedCostCategory");
  elements.fixedCostSubcategory = document.querySelector("#fixedCostSubcategory");
  elements.fixedCostWallet = document.querySelector("#fixedCostWallet");
  elements.fixedCostCancelButton = document.querySelector("#fixedCostCancelButton");
  elements.fixedCostList = document.querySelector("#fixedCostList");
}

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
    customSubcategories: {},
    fixedCosts: [],
    expenses: [],
  };
}

function saveState() {
  state = normalizeState(state);
  writeStorage(JSON.stringify(state));
}

function readStorage() {
  if (canUseLocalStorage()) {
    for (const key of STORAGE_KEYS) {
      const saved = localStorage.getItem(key);
      if (saved) return saved;
    }
  }

  return readWindowStorage();
}

function writeStorage(value) {
  let saved = false;

  if (canUseLocalStorage()) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      saved = true;
    } catch {
      saved = false;
    }
  }

  writeWindowStorage(value);
  return saved;
}

function clearStorage() {
  clearWindowStorage();
  if (!canUseLocalStorage()) return;

  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function readWindowStorage() {
  try {
    const data = JSON.parse(window.name || "{}");
    return typeof data?.[WINDOW_STORAGE_KEY] === "string" ? data[WINDOW_STORAGE_KEY] : null;
  } catch {
    return null;
  }
}

function writeWindowStorage(value) {
  try {
    const data = JSON.parse(window.name || "{}");
    data[WINDOW_STORAGE_KEY] = value;
    window.name = JSON.stringify(data);
    return true;
  } catch {
    return false;
  }
}

function clearWindowStorage() {
  try {
    const data = JSON.parse(window.name || "{}");
    delete data[WINDOW_STORAGE_KEY];
    window.name = JSON.stringify(data);
  } catch {
    window.name = "";
  }
}

function createBackupData() {
  state = normalizeState(state);
  return {
    app: BACKUP_APP_ID,
    version: 1,
    storageKey: STORAGE_KEY,
    exportedAt: new Date().toISOString(),
    data: state,
  };
}

async function downloadBackup() {
  const backup = createBackupData();
  const backupText = JSON.stringify(backup, null, 2);
  const fileName = `futari-saifu-backup-${new Date().toISOString().slice(0, 10)}.json`;
  const blob = new Blob([backupText], {
    type: "application/json",
  });

  if (await shareBackupOnMobile(blob, fileName)) return;

  startBackupDownload(blob, fileName);
}

async function shareBackupOnMobile(blob, fileName) {
  const isTouchSafari =
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (!isTouchSafari || !navigator.canShare || !navigator.share || typeof File === "undefined") {
    return false;
  }

  const file = new File([blob], fileName, { type: "application/json" });

  if (!navigator.canShare({ files: [file] })) return false;

  try {
    await navigator.share({
      files: [file],
      title: "ふたり財布バックアップ",
    });
    return true;
  } catch (error) {
    return error?.name === "AbortError";
  }
}

function startBackupDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  link.target = "_blank";
  link.style.position = "fixed";
  link.style.left = "-9999px";
  document.body.append(link);
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));

  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 30000);
}

function restoreBackupFile(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      const restoredState = parsed?.data || parsed;

      state = normalizeState(restoredState);
      saveState();
      closeBackup();
      render();
      alert("バックアップを読み込みました。");
    } catch {
      alert("読み込みに失敗しました。JSONファイルを確認してください。");
    } finally {
      elements.importDataInput.value = "";
    }
  });

  reader.addEventListener("error", () => {
    elements.importDataInput.value = "";
    alert("ファイルを読み込めませんでした。");
  });

  reader.readAsText(file);
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
  const customSubcategories = normalizeCustomSubcategories(savedState?.customSubcategories);

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
    customSubcategories,
    fixedCosts: Array.isArray(savedState?.fixedCosts)
      ? savedState.fixedCosts.map((fixedCost) => normalizeFixedCost(fixedCost, customSubcategories)).filter(Boolean)
      : [],
    expenses: Array.isArray(savedState?.expenses)
      ? savedState.expenses.map((expense) => normalizeExpense(expense, customSubcategories)).filter(Boolean)
      : [],
  };
}

function createDefaultMonthSettings() {
  return {
    myIncome: 0,
    partnerIncome: 0,
    myShared: 0,
    partnerShared: 0,
    categoryBudgets: {},
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
    categoryBudgets: normalizeCategoryBudgets(settings?.categoryBudgets),
  };
}

function normalizeCategoryBudgets(categoryBudgets) {
  if (!categoryBudgets || typeof categoryBudgets !== "object") return {};

  return Object.entries(categoryBudgets).reduce((budgets, [category, value]) => {
    const categoryKey = category === "fixed" ? "fixed" : normalizeCategory(category);
    const budget = toSafeNumber(value);

    if (budget > 0) budgets[categoryKey] = budget;
    return budgets;
  }, {});
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
  return monthLabel(state.selectedMonth);
}

function monthLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return `${year}年${month}月`;
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

function normalizeCustomSubcategories(customSubcategories) {
  if (!customSubcategories || typeof customSubcategories !== "object") return {};

  return Object.entries(customSubcategories).reduce((normalized, [category, items]) => {
    const categoryKey = normalizeCategory(category, {});
    if (!Array.isArray(items)) return normalized;
    const baseGroup = categoryGroups.find((group) => group.key === categoryKey);

    const seen = new Set();
    const children = items
      .map((item) => normalizeCustomSubcategory(categoryKey, item))
      .filter(Boolean)
      .filter((item) => {
        if (seen.has(item.key) || baseGroup?.children.some((child) => child.key === item.key)) {
          return false;
        }
        seen.add(item.key);
        return true;
      });

    if (children.length > 0) normalized[categoryKey] = children;
    return normalized;
  }, {});
}

function normalizeCustomSubcategory(category, item) {
  const label = String(item?.label || item || "").trim().slice(0, 20);
  if (!label) return null;

  return {
    key: String(item?.key || createSubcategoryKey(category, label)).trim(),
    label,
    words: Array.isArray(item?.words) ? item.words.map(String) : [],
    custom: true,
  };
}

function toSafeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function normalizeExpense(expense, customSubcategories = state?.customSubcategories || {}) {
  const amount = toSafeNumber(expense?.amount);
  if (!amount) return null;
  const category = normalizeCategory(expense?.category, customSubcategories);

  return {
    id: expense?.id || createExpenseId(),
    name: String(expense?.name || "支出"),
    amount,
    category,
    subcategory: normalizeSubcategory(category, expense?.subcategory || expense?.category, customSubcategories),
    wallet: normalizeWallet(expense?.wallet),
    createdAt: expense?.createdAt || new Date().toISOString(),
    fixedCostId: expense?.fixedCostId || "",
  };
}

function normalizeFixedCost(fixedCost, customSubcategories = state?.customSubcategories || {}) {
  const amount = toSafeNumber(fixedCost?.amount);
  if (!amount) return null;

  const category = normalizeCategory(fixedCost?.category, customSubcategories);

  return {
    id: fixedCost?.id || createExpenseId(),
    name: String(fixedCost?.name || "固定費").trim() || "固定費",
    amount,
    category,
    subcategory: normalizeSubcategory(category, fixedCost?.subcategory || fixedCost?.category, customSubcategories),
    wallet: normalizeWallet(fixedCost?.wallet) === "partner" ? "shared" : normalizeWallet(fixedCost?.wallet),
  };
}

function normalizeCategory(category, customSubcategories = state?.customSubcategories || {}) {
  const categoryMap = {
    rent: "housing",
    phone: "utilities",
    fun: "hobby",
  };

  if (categoryMap[category]) return categoryMap[category];
  if (allCategoryGroups(customSubcategories).some((group) => group.key === category)) return category;

  return categoryFromSubcategory(category, customSubcategories) || "other";
}

function normalizeSubcategory(category, subcategory, customSubcategories = state?.customSubcategories || {}) {
  const subcategoryMap = {
    paper: "consumables",
    subscription: "wifi",
    phone: "mobile",
    fun: "game",
    parking: "gasoline",
  };
  const mappedSubcategory = subcategoryMap[subcategory] || subcategory;
  const group = categoryGroup(category, customSubcategories);

  if (!group) return "uncategorized";
  if (group.children.some((child) => child.key === mappedSubcategory)) return mappedSubcategory;

  return group.key === "other"
    ? "uncategorized"
    : group.children[0]?.key || "uncategorized";
}

function allCategoryGroups(customSubcategories = state?.customSubcategories || {}) {
  return categoryGroups.map((group) => ({
    ...group,
    children: [...group.children, ...(customSubcategories[group.key] || [])],
  }));
}

function categoryGroup(category, customSubcategories = state?.customSubcategories || {}) {
  return allCategoryGroups(customSubcategories).find((group) => group.key === category);
}

function categoryFromSubcategory(subcategory, customSubcategories = state?.customSubcategories || {}) {
  return allCategoryGroups(customSubcategories).find((group) =>
    group.children.some((child) => child.key === subcategory),
  )?.key;
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

function createSubcategoryKey(category, label) {
  const normalized = toHalfWidth(label)
    .toLowerCase()
    .replace(/[^a-z0-9ぁ-んァ-ン一-龥]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);

  return `custom-${category}-${normalized || Date.now()}`;
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
  const { category, subcategory } = detectCategory(normalized);
  const wallet = selectedWallet;

  return { name, amount, category, subcategory, wallet };
}

function expenseInputText(expense) {
  return `${expense.name} ${expense.amount}円`;
}

function toHalfWidth(text) {
  return text.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}

function detectCategory(text) {
  for (const group of allCategoryGroups()) {
    const child = group.children.find((item) =>
      item.words.some((word) => text.includes(word.toLowerCase())),
    );

    if (child) return { category: group.key, subcategory: child.key };
  }

  return { category: "other", subcategory: "uncategorized" };
}

function categoryLabel(key) {
  return categories.find((category) => category.key === key)?.label || "その他";
}

function subcategoryLabel(category, subcategory) {
  return categoryGroup(category)?.children.find((child) => child.key === subcategory)?.label || "未分類";
}

function walletLabel(key) {
  const wallet = normalizeWallet(key);
  if (wallet === "shared") return defaultWalletLabels.shared;

  return state.displayNames[wallet] || defaultWalletLabels[wallet];
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

function createExpenseDateForMonth(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1, 9, 0, 0).toISOString();
}

function isFixedCostApplied(fixedCostId, monthKey = state.selectedMonth) {
  return state.expenses.some(
    (expense) => expense.fixedCostId === fixedCostId && expenseMatchesMonth(expense, monthKey),
  );
}

function applyFixedCostsForMonth(monthKey = state.selectedMonth) {
  const additions = state.fixedCosts
    .filter((fixedCost) => !isFixedCostApplied(fixedCost.id, monthKey))
    .map((fixedCost) => ({
      id: createExpenseId(),
      name: fixedCost.name,
      amount: fixedCost.amount,
      category: fixedCost.category,
      subcategory: fixedCost.subcategory,
      wallet: fixedCost.wallet,
      fixedCostId: fixedCost.id,
      createdAt: createExpenseDateForMonth(monthKey),
    }));

  if (additions.length === 0) return false;

  state.expenses = [...additions, ...state.expenses];
  saveState();
  return true;
}

function render() {
  applyFixedCostsForMonth(state.selectedMonth);
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
  elements.monthListButton.textContent = selectedMonthLabel();

  elements.myIncome.value = settings.myIncome || "";
  elements.partnerIncome.value = settings.partnerIncome || "";
  elements.myShared.value = settings.myShared || "";
  elements.partnerShared.value = settings.partnerShared || "";

  renderDisplayNames();
  applyTheme();
  renderMonthList();
  renderWalletSelector();
  renderThemeOptions();
  renderEditOptions();
  if (elements.fixedCostModal && !elements.fixedCostModal.hidden) renderFixedCosts();
  renderDailyExpenses(currentMonthVisibleExpenses);
  renderCategories(currentMonthVisibleExpenses, sharedSpent, mySpent);
  renderExpenses();
  renderExpenseSuggestions(elements.expenseText.value.trim());
}

function savedMonthKeys() {
  const months = new Set([state.selectedMonth, ...Object.keys(state.monthlySettings)]);
  state.expenses.forEach((expense) => {
    const date = new Date(expense.createdAt);
    if (!Number.isNaN(date.getTime())) months.add(monthKeyFromDate(date));
  });

  return [...months].sort().reverse();
}

function renderMonthList() {
  elements.monthList.innerHTML = savedMonthKeys()
    .map(
      (monthKey) => `
        <button class="${monthKey === state.selectedMonth ? "is-active" : ""}" type="button" data-month="${monthKey}">
          ${monthLabel(monthKey)}
        </button>
      `,
    )
    .join("");

  elements.monthList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMonth = button.dataset.month;
      getSelectedMonthSettings();
      elements.monthList.hidden = true;
      elements.monthListButton.setAttribute("aria-expanded", "false");
      saveState();
      render();
    });
  });
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
  renderFixedCostCategory(currentMonthVisibleExpenses, visibleSpent);

  allCategoryGroups().forEach((group) => {
    renderCategoryGroup(currentMonthVisibleExpenses, visibleSpent, group);
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

function renderFixedCostCategory(expenses, visibleSpent) {
  const fixedExpenses = expenses.filter((expense) => expense.fixedCostId);
  const total = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budget = categoryBudget("fixed");
  const percentageBase = budget > 0 ? budget : visibleSpent;
  const percentage = percentageBase > 0 ? Math.min(100, (total / percentageBase) * 100) : 0;
  const isOpen = Boolean(expandedCategories.fixed);
  const breakdown = fixedExpenses.reduce((items, expense) => {
    const key = expense.fixedCostId || expense.name;
    if (!items[key]) items[key] = { label: expense.name, total: 0 };
    items[key].total += expense.amount;
    return items;
  }, {});
  const row = document.createElement("div");

  row.className = "category-row is-expandable";
  row.innerHTML = `
    <button class="category-toggle" type="button" aria-expanded="${isOpen}" data-category-group="fixed">
      <span>固定費</span>
      <strong>${categoryAmountText(total, budget)}</strong>
    </button>
    <div class="meter" aria-hidden="true"><span style="--value: ${percentage}%"></span></div>
    ${categoryBudgetControl("fixed", total, budget)}
    ${
      isOpen
        ? `
          <div class="category-breakdown">
            ${
              Object.values(breakdown).length > 0
                ? Object.values(breakdown)
                    .map(
                      (item) => `
                        <div>
                          <span>${item.label}</span>
                          <strong>${yen(item.total)}</strong>
                        </div>
                      `,
                    )
                    .join("")
                : `
                  <div>
                    <span>登録なし</span>
                    <strong>${yen(0)}</strong>
                  </div>
                `
            }
          </div>
        `
        : ""
    }
  `;

  row.querySelector(".category-toggle").addEventListener("click", () => {
    expandedCategories.fixed = !expandedCategories.fixed;
    renderCategories(expenses, spentFrom("shared", state.selectedMonth), spentFrom("me", state.selectedMonth));
  });
  row.querySelector(".category-budget-button").addEventListener("click", () => {
    openBudgetEditor("fixed");
  });

  elements.categoryList.append(row);
}

function renderCategoryGroup(expenses, visibleSpent, group) {
  const total = totalByCategory(expenses, group.key);
  const budget = categoryBudget(group.key);
  const percentageBase = budget > 0 ? budget : visibleSpent;
  const percentage = percentageBase > 0 ? Math.min(100, (total / percentageBase) * 100) : 0;
  const hasChildren = group.children.length > 0;
  const isOpen = Boolean(expandedCategories[group.key]);
  const row = document.createElement("div");

  row.className = `category-row ${hasChildren ? "is-expandable" : ""}`;
  row.innerHTML = `
    ${
      hasChildren
        ? `
          <button class="category-toggle" type="button" aria-expanded="${isOpen}" data-category-group="${group.key}">
            <span>${group.label}</span>
            <strong>${categoryAmountText(total, budget)}</strong>
          </button>
        `
        : `
          <div class="category-head">
            <span>${group.label}</span>
            <strong>${categoryAmountText(total, budget)}</strong>
          </div>
        `
    }
    <div class="meter" aria-hidden="true"><span style="--value: ${percentage}%"></span></div>
    ${categoryBudgetControl(group.key, total, budget)}
    ${
      hasChildren && isOpen
        ? `
          <div class="category-breakdown">
            ${group.children
              .map(
                (child) => `
                  <div>
                    <span>${child.label}</span>
                    <strong>${yen(totalBySubcategory(expenses, group.key, child.key))}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
        `
        : ""
    }
  `;

  row.querySelector(".category-toggle")?.addEventListener("click", () => {
    expandedCategories[group.key] = !expandedCategories[group.key];
    renderCategories(expenses, spentFrom("shared", state.selectedMonth), spentFrom("me", state.selectedMonth));
  });
  row.querySelector(".category-budget-button").addEventListener("click", () => {
    openBudgetEditor(group.key);
  });

  elements.categoryList.append(row);
}

function categoryBudget(categoryKey) {
  return toSafeNumber(getSelectedMonthSettings().categoryBudgets?.[categoryKey]);
}

function categoryAmountText(total, budget) {
  return budget > 0 ? `${yen(total)} / ${yen(budget)}` : yen(total);
}

function categoryBudgetControl(categoryKey, total, budget) {
  const remaining = budget - total;
  const hasBudget = budget > 0;

  return `
    <div class="category-budget-note ${hasBudget && remaining < 0 ? "is-over-budget" : ""}">
      <span>${hasBudget ? `残り ${yen(remaining)}` : "予算未設定"}</span>
      <button class="text-button category-budget-button" type="button" data-budget-category="${categoryKey}">
        予算設定
      </button>
    </div>
  `;
}

function openBudgetEditor(categoryKey) {
  ensureBudgetElements();
  const currentBudget = categoryBudget(categoryKey);

  elements.editingBudgetCategory.value = categoryKey;
  elements.budgetCategoryName.textContent = `${budgetCategoryLabel(categoryKey)}の月予算`;
  elements.categoryBudgetInput.value = currentBudget || "";
  elements.budgetModal.hidden = false;
  elements.categoryBudgetInput.focus();
}

function closeBudgetEditor() {
  elements.budgetModal.hidden = true;
}

function saveCategoryBudget(categoryKey, budget) {
  const settings = getSelectedMonthSettings();
  settings.categoryBudgets = { ...(settings.categoryBudgets || {}) };

  if (budget > 0) {
    settings.categoryBudgets[categoryKey] = budget;
  } else {
    delete settings.categoryBudgets[categoryKey];
  }

  saveState();
  render();
}

function budgetCategoryLabel(categoryKey) {
  return categoryKey === "fixed" ? "固定費" : categoryLabel(categoryKey);
}

function totalByCategory(expenses, categoryKey) {
  return expenses
    .filter((expense) => expense.category === categoryKey)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function totalBySubcategory(expenses, categoryKey, subcategoryKey) {
  return expenses
    .filter((expense) => expense.category === categoryKey && expense.subcategory === subcategoryKey)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function renderDailyExpenses(expenses) {
  if (!elements.dailyExpenseSummary || !elements.dailyExpenseList) return;

  elements.dailyExpenseSummary.innerHTML = "";
  elements.dailyExpenseList.innerHTML = "";

  const dailyTotals = groupDailyExpenseTotals(expenses);

  if (dailyTotals.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "まだ支出はありません";
    elements.dailyExpenseList.append(empty);
    return;
  }

  dailyTotals.slice(0, 7).forEach((day) => {
    const row = document.createElement("div");
    row.className = "daily-expense-row";
    row.innerHTML = `
      <span>${day.label}</span>
      <strong>${yen(day.total)}</strong>
    `;
    elements.dailyExpenseList.append(row);
  });

  const weeklyComparison = getWeeklyExpenseComparison(expenses);
  elements.dailyExpenseSummary.innerHTML = `
    <div class="weekly-expense-summary">
      <div>
        <span>今週</span>
        <strong>${yen(weeklyComparison.thisWeek)}</strong>
      </div>
      <div>
        <span>先週</span>
        <strong>${yen(weeklyComparison.lastWeek)}</strong>
      </div>
      <div>
        <span>${weeklyComparison.diffLabel}</span>
        <strong>${weeklyComparison.diffText}</strong>
      </div>
    </div>
  `;
}

function groupDailyExpenseTotals(expenses) {
  const groups = expenses.reduce((dailyGroups, expense) => {
    const date = new Date(expense.createdAt);
    const key = Number.isNaN(date.getTime()) ? "unknown" : localDateKey(date);

    if (!dailyGroups[key]) {
      dailyGroups[key] = {
        key,
        label: Number.isNaN(date.getTime()) ? "日付なし" : formatDailyExpenseLabel(date),
        total: 0,
      };
    }

    dailyGroups[key].total += expense.amount;
    return dailyGroups;
  }, {});

  return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key));
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDailyExpenseLabel(date) {
  const base = `${date.getMonth() + 1}/${date.getDate()}`;
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (localDateKey(date) === localDateKey(today)) return `${base} 今日`;
  if (localDateKey(date) === localDateKey(yesterday)) return `${base} 昨日`;
  return base;
}

function getWeeklyExpenseComparison(expenses) {
  const today = new Date();
  const thisWeekStart = startOfWeek(today);
  const nextWeekStart = addDays(thisWeekStart, 7);
  const lastWeekStart = addDays(thisWeekStart, -7);

  const thisWeek = totalBetweenDates(expenses, thisWeekStart, nextWeekStart);
  const lastWeek = totalBetweenDates(expenses, lastWeekStart, thisWeekStart);
  const diff = thisWeek - lastWeek;

  return {
    thisWeek,
    lastWeek,
    diffLabel: diff === 0 ? "先週と同じ" : "先週より",
    diffText: diff === 0 ? "" : `${diff > 0 ? "+" : "-"}${yen(Math.abs(diff))}`,
  };
}

function totalBetweenDates(expenses, start, end) {
  return expenses
    .filter((expense) => {
      const date = new Date(expense.createdAt);
      return !Number.isNaN(date.getTime()) && date >= start && date < end;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function startOfWeek(date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);
  return start;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
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

  groupExpensesByDay(sortedExpenses).forEach(({ dateLabel, total, expenses }) => {
    const group = document.createElement("section");
    group.className = "day-group";
    group.innerHTML = `
      <div class="day-head">
        <span>${dateLabel}</span>
        <strong>支出合計: ${yen(total)}</strong>
      </div>
      <div class="day-items"></div>
    `;
    const dayItems = group.querySelector(".day-items");

    expenses.forEach((expense) => {
      const item = elements.expenseItemTemplate.content.firstElementChild.cloneNode(true);
      item.querySelector(".expense-title").textContent = expense.name;
      item.querySelector(".expense-meta").textContent =
        `${categoryLabel(expense.category)} / ${subcategoryLabel(expense.category, expense.subcategory)} / ${walletLabel(expense.wallet)}${expense.fixedCostId ? " / 固定費" : ""}`;
      item.querySelector(".expense-amount").textContent = yen(expense.amount);
      item.querySelector(".edit-button").addEventListener("click", () => {
        openExpenseEditor(expense.id);
      });
      item.querySelector(".delete-button").addEventListener("click", () => {
        state.expenses = state.expenses.filter((itemExpense) => itemExpense.id !== expense.id);
        saveState();
        render();
      });
      dayItems.append(item);
    });

    elements.expenseList.append(group);
  });
}

function groupExpensesByDay(expenses) {
  const groups = expenses.reduce((dailyGroups, expense) => {
    const date = new Date(expense.createdAt);
    const key = Number.isNaN(date.getTime()) ? "unknown" : date.toISOString().slice(0, 10);

    if (!dailyGroups[key]) {
      dailyGroups[key] = {
        dateLabel: Number.isNaN(date.getTime()) ? "日付なし" : formatExpenseDate(expense.createdAt),
        total: 0,
        expenses: [],
      };
    }

    dailyGroups[key].total += expense.amount;
    dailyGroups[key].expenses.push(expense);
    return dailyGroups;
  }, {});

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, group]) => group);
}

function renderExpenseSuggestions(query = "") {
  if (!elements.expenseSuggestions || !elements.expenseSuggestionList) return;

  if (query.trim()) {
    elements.expenseSuggestions.hidden = true;
    elements.expenseSuggestionList.innerHTML = "";
    return;
  }

  const suggestions = getExpenseSuggestions(query);

  if (suggestions.length === 0) {
    elements.expenseSuggestions.hidden = true;
    elements.expenseSuggestionList.innerHTML = "";
    return;
  }

  elements.expenseSuggestionLabel.textContent = "よく使う";
  elements.expenseSuggestionList.innerHTML = "";

  suggestions.forEach((suggestion) => {
    const button = document.createElement("button");
    button.className = "suggestion-chip";
    button.type = "button";
    button.textContent = suggestion.label;
    button.addEventListener("click", () => {
      elements.expenseText.value = suggestion.inputText;
      updatePrediction();
      elements.expenseText.focus();
    });
    elements.expenseSuggestionList.append(button);
  });

  elements.expenseSuggestions.hidden = false;
}

function getExpenseSuggestions(query = "") {
  const normalizedQuery = normalizeSuggestionText(query);

  if (!normalizedQuery) return getFrequentNameSuggestions();
  return [];
}

function getFrequentNameSuggestions() {
  const suggestionsByName = state.expenses
    .filter((expense) => expense.wallet !== "partner")
    .reduce((items, expense) => {
      const normalizedName = normalizeSuggestionText(expense.name);
      if (!normalizedName) return items;

      const createdAtTime = new Date(expense.createdAt).getTime() || 0;

      if (!items[normalizedName]) {
        items[normalizedName] = {
          name: expense.name,
          label: expense.name,
          inputText: expense.name,
          count: 0,
          selectedWalletCount: 0,
          lastUsedAt: 0,
        };
      }

      items[normalizedName].count += 1;
      if (expense.wallet === selectedWallet) items[normalizedName].selectedWalletCount += 1;
      items[normalizedName].lastUsedAt = Math.max(items[normalizedName].lastUsedAt, createdAtTime);
      return items;
    }, {});

  return Object.values(suggestionsByName)
    .filter((suggestion) => suggestion.count >= 3)
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      const walletPriority = b.selectedWalletCount - a.selectedWalletCount;
      if (walletPriority !== 0) return walletPriority;
      return b.lastUsedAt - a.lastUsedAt;
    })
    .slice(0, 5);
}

function normalizeSuggestionText(text) {
  return toHalfWidth(String(text || "")).toLowerCase().trim();
}

function handleSetupInput(event) {
  const target = event.target;
  if (!target.id) return;

  getSelectedMonthSettings()[target.id] = Number(toHalfWidth(target.value).replace(/[^\d]/g, ""));
  saveState();
  render();
}

function renderEditOptions() {
  ensureEditSubcategoryElement();
  elements.editExpenseCategory.innerHTML = categories
    .map((category) => `<option value="${category.key}">${category.label}</option>`)
    .join("");
  renderEditSubcategoryOptions(elements.editExpenseCategory.value || "food");
  elements.editExpenseWallet.querySelector('option[value="me"]').textContent = walletLabel("me");
}

function renderFixedCostOptions() {
  elements.fixedCostCategory.innerHTML = categories
    .map((category) => `<option value="${category.key}">${category.label}</option>`)
    .join("");
  renderFixedCostSubcategoryOptions(elements.fixedCostCategory.value || "food");
  elements.fixedCostWallet.querySelector('option[value="me"]').textContent = walletLabel("me");
}

function renderEditSubcategoryOptions(categoryKey) {
  ensureEditSubcategoryElement();
  const group = categoryGroup(categoryKey) || categoryGroup("other");

  elements.editExpenseSubcategory.innerHTML = group.children
    .map((child) => `<option value="${child.key}">${child.label}</option>`)
    .join("");

  elements.editExpenseSubcategory.insertAdjacentHTML(
    "beforeend",
    `<option value="${ADD_SUBCATEGORY_OPTION}">＋内訳を追加</option>`,
  );
}

function renderFixedCostSubcategoryOptions(categoryKey) {
  const group = categoryGroup(categoryKey) || categoryGroup("other");

  elements.fixedCostSubcategory.innerHTML = group.children
    .map((child) => `<option value="${child.key}">${child.label}</option>`)
    .join("");
  elements.fixedCostSubcategory.insertAdjacentHTML(
    "beforeend",
    `<option value="${ADD_SUBCATEGORY_OPTION}">＋内訳を追加</option>`,
  );
}

function addCustomSubcategory(categoryKey, label) {
  const category = normalizeCategory(categoryKey);
  const normalizedLabel = String(label || "").trim().slice(0, 20);
  if (!normalizedLabel) return "";

  const group = categoryGroup(category);
  const existing = group.children.find((child) => child.label === normalizedLabel);
  if (existing) return existing.key;

  const item = {
    key: createSubcategoryKey(category, normalizedLabel),
    label: normalizedLabel,
    words: [normalizedLabel],
    custom: true,
  };

  state.customSubcategories[category] = [...(state.customSubcategories[category] || []), item];
  saveState();
  return item.key;
}

function resetFixedCostForm() {
  elements.editingFixedCostId.value = "";
  elements.fixedCostName.value = "";
  elements.fixedCostAmount.value = "";
  elements.fixedCostCategory.value = "housing";
  renderFixedCostSubcategoryOptions("housing");
  elements.fixedCostSubcategory.value = "rent";
  elements.fixedCostWallet.value = "shared";
}

function renderFixedCosts() {
  elements.fixedCostStatus.textContent =
    state.fixedCosts.length === 0
      ? "固定費はまだ登録されていません。"
      : `${selectedMonthLabel()}は ${appliedFixedCostCount()} / ${state.fixedCosts.length} 件反映済み`;
  elements.fixedCostList.innerHTML = "";

  if (state.fixedCosts.length === 0) return;

  state.fixedCosts.forEach((fixedCost) => {
    const item = document.createElement("article");
    item.className = "fixed-cost-item";
    item.innerHTML = `
      <div>
        <strong>${fixedCost.name}</strong>
        <span>${categoryLabel(fixedCost.category)} / ${subcategoryLabel(fixedCost.category, fixedCost.subcategory)} / ${walletLabel(fixedCost.wallet)}</span>
      </div>
      <div class="expense-side">
        <b>${yen(fixedCost.amount)}</b>
        <button class="edit-button" type="button" data-action="edit">編集</button>
        <button class="delete-button" type="button" data-action="delete" aria-label="削除" title="削除">×</button>
      </div>
    `;

    item.querySelector('[data-action="edit"]').addEventListener("click", () => {
      elements.editingFixedCostId.value = fixedCost.id;
      elements.fixedCostName.value = fixedCost.name;
      elements.fixedCostAmount.value = fixedCost.amount;
      elements.fixedCostCategory.value = fixedCost.category;
      renderFixedCostSubcategoryOptions(fixedCost.category);
      elements.fixedCostSubcategory.value = fixedCost.subcategory;
      elements.fixedCostWallet.value = fixedCost.wallet;
    });

    item.querySelector('[data-action="delete"]').addEventListener("click", () => {
      state.fixedCosts = state.fixedCosts.filter((itemFixedCost) => itemFixedCost.id !== fixedCost.id);
      saveState();
      resetFixedCostForm();
      renderFixedCosts();
    });

    elements.fixedCostList.append(item);
  });
}

function appliedFixedCostCount() {
  return state.fixedCosts.filter((fixedCost) => isFixedCostApplied(fixedCost.id)).length;
}

function createFixedCostFromExpense(expense, fixedCostId = "") {
  return normalizeFixedCost({
    id: fixedCostId || createExpenseId(),
    name: expense.name,
    amount: expense.amount,
    category: expense.category,
    subcategory: expense.subcategory,
    wallet: expense.wallet,
  });
}

function upsertFixedCostFromExpense(expense, fixedCostId = "") {
  const fixedCost = createFixedCostFromExpense(expense, fixedCostId);
  if (!fixedCost) return "";

  const existingIndex = state.fixedCosts.findIndex((item) => item.id === fixedCost.id);
  if (existingIndex >= 0) {
    state.fixedCosts[existingIndex] = fixedCost;
  } else {
    state.fixedCosts.unshift(fixedCost);
  }

  return fixedCost.id;
}

function removeFixedCostRegistration(fixedCostId) {
  if (!fixedCostId) return;

  state.fixedCosts = state.fixedCosts.filter((fixedCost) => fixedCost.id !== fixedCostId);
  state.expenses = state.expenses.map((expense) =>
    expense.fixedCostId === fixedCostId ? { ...expense, fixedCostId: "" } : expense,
  );
}

function openExpenseEditor(expenseId) {
  const expense = state.expenses.find((item) => item.id === expenseId);
  if (!expense) return;

  elements.editingExpenseId.value = expense.id;
  elements.editExpenseName.value = expense.name;
  elements.editExpenseAmount.value = expense.amount;
  elements.editExpenseCategory.value = expense.category;
  renderEditSubcategoryOptions(expense.category);
  elements.editExpenseSubcategory.value = normalizeSubcategory(expense.category, expense.subcategory);
  elements.editExpenseWallet.value = expense.wallet === "partner" ? "shared" : expense.wallet;
  elements.editExpenseFixedToggle.checked = Boolean(expense.fixedCostId);
  elements.expenseEditModal.hidden = false;
  elements.editExpenseName.focus();
}

function closeExpenseEditor() {
  elements.expenseEditModal.hidden = true;
}

ensureBackupElements();
ensureEditSubcategoryElement();
ensureBudgetElements();

elements.setupForm.addEventListener("input", handleSetupInput);
elements.setupForm.addEventListener("change", handleSetupInput);

elements.prevMonthButton.addEventListener("click", () => {
  moveSelectedMonth(-1);
});

elements.nextMonthButton.addEventListener("click", () => {
  moveSelectedMonth(1);
});

elements.monthListButton.addEventListener("click", () => {
  const isOpen = elements.monthList.hidden;
  renderMonthList();
  elements.monthList.hidden = !isOpen;
  elements.monthListButton.setAttribute("aria-expanded", String(isOpen));
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

elements.fixedCostOpenButton?.addEventListener("click", () => {
  elements.mainMenu.hidden = true;
  elements.menuButton.setAttribute("aria-expanded", "false");
  openFixedCosts();
});

elements.backupOpenButton.addEventListener("click", () => {
  elements.mainMenu.hidden = true;
  elements.menuButton.setAttribute("aria-expanded", "false");
  openBackup();
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

elements.budgetCloseButton.addEventListener("click", closeBudgetEditor);
elements.budgetModal.addEventListener("click", (event) => {
  if (event.target === elements.budgetModal) closeBudgetEditor();
});
elements.budgetClearButton.addEventListener("click", () => {
  saveCategoryBudget(elements.editingBudgetCategory.value, 0);
  closeBudgetEditor();
});
elements.budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const budget = Number(toHalfWidth(elements.categoryBudgetInput.value).replace(/[^\d]/g, ""));

  saveCategoryBudget(elements.editingBudgetCategory.value, budget);
  closeBudgetEditor();
});

elements.fixedCostCloseButton?.addEventListener("click", closeFixedCosts);
elements.fixedCostModal?.addEventListener("click", (event) => {
  if (event.target === elements.fixedCostModal) closeFixedCosts();
});

elements.backupCloseButton.addEventListener("click", closeBackup);
elements.backupModal.addEventListener("click", (event) => {
  if (event.target === elements.backupModal) closeBackup();
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

function openFixedCosts() {
  renderFixedCostOptions();
  resetFixedCostForm();
  renderFixedCosts();
  elements.fixedCostModal.hidden = false;
}

function closeFixedCosts() {
  elements.fixedCostModal.hidden = true;
}

function openBackup() {
  ensureBackupElements();
  elements.backupModal.hidden = false;
  elements.backupModal.removeAttribute("hidden");
}

function closeBackup() {
  elements.backupModal.hidden = true;
}

elements.settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.displayNames.me = normalizeDisplayName(elements.meDisplayName.value);
  state.displayNames.partner = normalizeDisplayName(elements.partnerDisplayName.value);
  saveState();
  closeSettings();
  render();
});

elements.exportDataButton.addEventListener("click", async () => {
  try {
    await downloadBackup();
  } catch {
    alert("データを書き出せませんでした。もう一度お試しください。");
  }
});

elements.importDataButton.addEventListener("click", () => {
  elements.importDataInput.click();
});

elements.importDataInput.addEventListener("change", () => {
  const file = elements.importDataInput.files?.[0];

  if (!file) return;

  if (!confirm("現在のデータが上書きされます。読み込みますか？")) {
    elements.importDataInput.value = "";
    return;
  }

  restoreBackupFile(file);
});

elements.fixedCostCategory?.addEventListener("change", () => {
  renderFixedCostSubcategoryOptions(elements.fixedCostCategory.value);
});

elements.fixedCostSubcategory?.addEventListener("change", () => {
  if (elements.fixedCostSubcategory.value !== ADD_SUBCATEGORY_OPTION) return;

  const category = normalizeCategory(elements.fixedCostCategory.value);
  const label = prompt("追加する内訳名を入力してください");
  const addedKey = addCustomSubcategory(category, label);

  renderFixedCostSubcategoryOptions(category);
  if (addedKey) elements.fixedCostSubcategory.value = addedKey;
});

elements.fixedCostCancelButton?.addEventListener("click", () => {
  resetFixedCostForm();
});

elements.fixedCostForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fixedCostId = elements.editingFixedCostId.value;
  const category = normalizeCategory(elements.fixedCostCategory.value);
  const fixedCost = normalizeFixedCost({
    id: fixedCostId || createExpenseId(),
    name: elements.fixedCostName.value,
    amount: Number(toHalfWidth(elements.fixedCostAmount.value).replace(/[^\d]/g, "")),
    category,
    subcategory: elements.fixedCostSubcategory.value,
    wallet: elements.fixedCostWallet.value,
  });

  if (!fixedCost) return;

  const reflectedThisMonth = state.expenses.find(
    (expense) => expense.fixedCostId === fixedCost.id && expenseMatchesMonth(expense, state.selectedMonth),
  );

  if (fixedCostId) {
    state.fixedCosts = state.fixedCosts.map((item) => (item.id === fixedCostId ? fixedCost : item));
    if (reflectedThisMonth) {
      Object.assign(reflectedThisMonth, {
        name: fixedCost.name,
        amount: fixedCost.amount,
        category: fixedCost.category,
        subcategory: fixedCost.subcategory,
        wallet: fixedCost.wallet,
      });
    }
  } else {
    state.fixedCosts.unshift(fixedCost);
  }

  saveState();
  applyFixedCostsForMonth(state.selectedMonth);
  resetFixedCostForm();
  render();
});

elements.expenseEditCloseButton.addEventListener("click", closeExpenseEditor);
elements.expenseEditCancelButton.addEventListener("click", closeExpenseEditor);
elements.expenseEditModal.addEventListener("click", (event) => {
  if (event.target === elements.expenseEditModal) closeExpenseEditor();
});

elements.editExpenseCategory.addEventListener("change", () => {
  renderEditSubcategoryOptions(elements.editExpenseCategory.value);
});

elements.editExpenseSubcategory.addEventListener("change", () => {
  if (elements.editExpenseSubcategory.value !== ADD_SUBCATEGORY_OPTION) return;

  const category = normalizeCategory(elements.editExpenseCategory.value);
  const label = prompt("追加する内訳名を入力してください");
  const addedKey = addCustomSubcategory(category, label);

  renderEditSubcategoryOptions(category);
  if (addedKey) {
    elements.editExpenseSubcategory.value = addedKey;
    renderCategories(monthlyExpenses().filter((expense) => expense.wallet !== "partner"), spentFrom("shared", state.selectedMonth), spentFrom("me", state.selectedMonth));
  }
});

elements.expenseEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expenseId = elements.editingExpenseId.value;
  const amount = Number(toHalfWidth(elements.editExpenseAmount.value).replace(/[^\d]/g, ""));
  const name = elements.editExpenseName.value.trim() || "支出";
  const category = normalizeCategory(elements.editExpenseCategory.value);
  const subcategory = normalizeSubcategory(category, elements.editExpenseSubcategory.value);
  const wallet = normalizeWallet(elements.editExpenseWallet.value);
  const originalExpense = state.expenses.find((expense) => expense.id === expenseId);
  const shouldBeFixed = elements.editExpenseFixedToggle.checked;

  if (!amount || !originalExpense) return;

  const updatedExpense = {
    ...originalExpense,
    name,
    amount,
    category,
    subcategory,
    wallet: wallet === "partner" ? "shared" : wallet,
  };

  if (shouldBeFixed) {
    updatedExpense.fixedCostId = upsertFixedCostFromExpense(updatedExpense, originalExpense.fixedCostId);
  } else {
    removeFixedCostRegistration(originalExpense.fixedCostId);
    updatedExpense.fixedCostId = "";
  }

  state.expenses = state.expenses.map((expense) =>
    expense.id === expenseId ? updatedExpense : expense,
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
  renderExpenseSuggestions(text);

  if (!text) {
    elements.prediction.textContent = "入力すると自動で分類します";
    return;
  }

  const expense = parseExpense(text);
  elements.prediction.textContent =
    `${categoryLabel(expense.category)} / ${subcategoryLabel(expense.category, expense.subcategory)} / ${walletLabel(expense.wallet)} / ${yen(expense.amount)}`;
}

elements.expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.expenseText.value.trim();
  const expense = parseExpense(text);

  if (!expense.amount) {
    elements.prediction.textContent = "金額を入れてください。例: セブン 240円";
    return;
  }

  const fixedCostId = elements.expenseFixedToggle.checked ? upsertFixedCostFromExpense(expense) : "";

  state.expenses.unshift({
    ...expense,
    id: createExpenseId(),
    fixedCostId,
    createdAt: createExpenseDateForSelectedMonth(),
  });
  elements.expenseText.value = "";
  elements.expenseFixedToggle.checked = false;
  elements.prediction.textContent = "入力すると自動で分類します";
  saveState();
  render();
  renderExpenseSuggestions();
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
