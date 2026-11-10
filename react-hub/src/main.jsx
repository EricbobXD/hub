import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import profile from "./assets/profile.png";
import clothing from "./assets/cloth_ai_chose.png";
import blockly from "./assets/blockly.png";
import blocklyEditor from "./assets/blockly-editor.png";
import homeRun from "./assets/home_run.png";
import give from "./assets/cmd_give.png";
import uuid from "./assets/UUID-Password.png";
import railMap from "./assets/rail-sprint-map.png";
import yixuPreview from "./assets/yixu-preview.jpg";
import "./styles.css";

const pages = [
  ["home", "首頁", "M2 7.5 8 2l6 5.5V14H2z M6 14v-4h4v4"],
  ["about", "關於我", "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M2.5 14a5.5 4 0 0 1 11 0"],
  ["work", "作品集", "M2 5h12v9H2z M5 5V2h6v3 M2 9h12 M7 9v2h2V9"],
  ["photography", "攝影", "M1 5h3l1-2h6l1 2h3v9H1z M11 9a3 3 0 1 0-6 0 3 3 0 0 0 6 0"],
  ["notes", "筆記／實作紀錄", "M3 1h10v14H3z M6 5h4 M6 8h4 M6 11h3"],
  ["contact", "聯絡我", "M2 3.5h12v9H2z M2 4l6 5 6-5"],
];

const skills = ["HTML / CSS", "JavaScript", "React", "Python", "Blockly"];
const githubUrl = "https://github.com/EricbobXD";
const youtubeUrl = "https://www.youtube.com/@ericbob_metro";

const timeline = [
  {
    year: 2023,
    events: [
      "參加 Minecraft × Python 程式設計課程，接觸 Python、JavaScript 與 JSON，從遊戲附加包延伸到網頁工具。",
      "7 月 28 日建立 Hub 的 GitHub 儲存庫，開始整理個人介紹與網頁作品。",
    ],
  },
  {
    year: 2024,
    events: [
      "教育部第 16 屆生活科技學藝競賽全國第八名。負責初步電路接線、裝置實作與控制程式，開始接觸 Arduino Blockly。",
      "臺北市 STEAM 跨域龍舟競賽高中職組第二名。擔任隊長、撰寫船隻控制程式，協調分工並處理現場裝置問題。",
      "台灣仿生設計競賽高中職組全國決賽入選。",
      "參加暑期 C++ 程式設計課程，練習資料結構、排序，以及 Ubuntu 環境下的命令列與編譯操作。",
      "在 GitHub 建立 UUID 與密碼生成器、Minecraft /give 與文字指令工具，以及智能衣櫃專案儲存庫。",
    ],
  },
  {
    year: 2025,
    events: [
      "與夥伴開發 C++ Blockly，將積木轉成 C++ 程式碼，並依使用者回饋調整教學與操作介面；專題小論文獲資訊類甲等。",
      "仰望盃全國科學 HomeRun 實作大賽銅牌獎。團隊製作聲音辨識防詐原型，我負責初版網頁、初步加密程式與裝置動態測試。",
      "在 WFTRC 擔任 Python 教學長，協助環境安裝、解題及教材編輯；在「IoT 初探：一日速通」活動中排除程式與設備故障，並撰寫課程介紹網頁。",
      "4 月 11 日建立 3D 模型檢視器的 GitHub 儲存庫，製作能在瀏覽器載入與預覽模型的工具。",
      "完成 AIS3 Juniors 高中職資安課程，練習 Linux、網頁前後端與 CTF，並與組員研究 Apache HTTP Server Confusion Attacks。",
      "成大程式設計邀請賽初賽第六名、決賽第二十九名；參加 TOI 初試。APCS 歷次最佳成績為識讀三級、實作三級。",
      "參加 APCS 模擬測驗團隊 × APCSGuide 暑期營隊，練習枚舉、貪心與排序，取得解題榜第九名與結業證書。",
      "參加 AI Agent 共學實驗室課程，學習 n8n 工作流，並協助其他學員完成實作。",
      "勞動部南方創客基地創客自造松競賽晉級決賽。",
    ],
  },
  {
    year: 2026,
    events: [
      "1 月起調整 C++ Blockly 的程式結構與方塊定義，陸續補上函式、容器、位元集合與排序演算法積木。",
      "1 月 27 日建立程式碼與彩色圖像轉換實驗的 GitHub 儲存庫，嘗試讓文字與圖像互相還原。",
      "10 月 8 日重置 C++ Blockly 為 Blocksmith C++ Blockly Studio，並建置部署至 GitHub Pages。",
      "10 月 20 日建立站站練習 Rail Sprint 的 GitHub 儲存庫，用 React 製作台灣鐵道路網填空、最少站數與轉乘挑戰。",
      "10 月 27–28 日以 React 與 Vite 重製衣序並部署，加入本機衣櫥管理、衣物照片取色與依天氣、場合產生搭配提案的流程。",
      "11 月重製個人 Hub，融合舊版內容與視覺設計，改用 React 與 Vite；11 月 7 日發布至 GitHub Pages。",
    ],
  },
];

const projects = [
  {
    id: "rail-sprint",
    homepage: "https://ericbobxd.github.io/Metro_guest/",
    title: "站站練習 Rail Sprint",
    preview: railMap,
    previewAlt: "站站練習的雙北與桃園路網圖",
    description: "透過站名填空、最少站數和轉乘挑戰熟悉台灣鐵道路網。",
    details: "可拖曳、縮放路線圖。最少站數模式接受等長的最短路徑。",
  },
  {
    id: "yixu",
    homepage: "https://ericbobxd.github.io/school.clothing_ai_chose/",
    title: "衣序 YIXU",
    icon: clothing,
    cover: yixuPreview,
    previewAlt: "衣序的穿搭設定、指定單品與搭配提案介面",
    description: "管理自己的衣櫥，依天氣、場合和心情取得穿搭提案。",
    details: "源自程式設計課的團隊專題「智能衣櫃」，我負責前端、互動邏輯與資料串接。現在的衣序可框選衣物照片擷取主色，並將衣櫥保存在瀏覽器。",
  },
  {
    id: "cpp-blockly",
    homepage: "https://ericbobxd.github.io/C_plus_plus_Blockly/",
    title: "C++ Blockly",
    icon: blockly,
    cover: blocklyEditor,
    previewAlt: "C++ Blockly 編輯器，左側是積木分類，中間是工作區，右側是操作面板",
    description: "和 bosen-you 合作，把 C++ 語法做成可以拖曳組合的積木。",
    details: "我們想讓初學者用熟悉的積木方式練習 C++，因此用 JavaScript 把工作區裡的積木轉成程式碼。收到教學不夠直觀的回饋後，我們調整了操作面板，讓工作區留出更多空間，也改善了教學提示。",
  },
  {
    title: "仰望盃 HomeRun",
    icon: homeRun,
    description: "團隊製作的聲音辨識防詐原型。我負責初版網頁、初步加密程式與裝置動態測試。",
  },
  {
    title: "Minecraft 指令工具",
    icon: give,
    description: "為基岩版製作的物品發放及文字顯示指令生成器。",
  },
  {
    title: "UUID 與密碼生成器",
    icon: uuid,
    description: "在瀏覽器裡產生 UUID 或密碼的小工具。",
  },
  {
    title: "WFTRC 活動網站",
    symbol: "WF",
    description: "介紹社團 IoT 自走車集訓的目的、課程與活動資訊。",
  },
  {
    title: "3D 模型預覽器",
    symbol: "3D",
    description: "在瀏覽器中載入與預覽 3D 模型的輕量工具。",
  },
  {
    title: "程式碼與彩色圖像轉換",
    symbol: "</>",
    description: "將程式碼轉成彩色圖像，再從圖像還原文字的轉換實驗。",
  },
  {
    title: "校慶訂餐系統",
    symbol: "食",
    description: "以校慶訂餐情境設計的選餐介面原型。",
  },
];

const featuredProjects = projects.filter(project => project.id);

function FeaturedCarousel({ active }) {
  const [index, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const project = featuredProjects[index];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!active || interacting || reducedMotion) return;
    const interval = setInterval(() => {
      if (!document.hidden) setIndex(previous => (previous + 1) % featuredProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [active, interacting, reducedMotion, index]);

  return (
    <div className="featured-carousel" role="region" aria-roledescription="輪播" aria-label="精選作品展示"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className="carousel-stage">
        <button className="carousel-arrow previous" type="button" aria-label="上一件作品" onClick={() => setIndex((index + featuredProjects.length - 1) % featuredProjects.length)}>&lt;</button>
        <a className="card hero-feature" href={project.homepage}>
        <div key={project.id} className="carousel-slide">
          <p className="eyebrow">FEATURED PROJECT · {index + 1} / {featuredProjects.length}</p>
          <img src={project.cover || project.preview || project.icon} alt={project.previewAlt} width="1280" height="720" />
          <h2>{project.title} <span aria-hidden="true">↗</span></h2>
          <p className="muted">{project.description}</p>
        </div>
        </a>
        <button className="carousel-arrow next" type="button" aria-label="下一件作品" onClick={() => setIndex((index + 1) % featuredProjects.length)}>&gt;</button>
      </div>
      <div className="carousel-controls">
        <div className="carousel-dots">
          {featuredProjects.map((item, position) => (
            <button key={item.id} type="button" aria-label={`展示${item.title}`} aria-pressed={position === index} onClick={() => setIndex(position)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Home({ active }) {
  return (
    <>
      <div className="hero">
        <div>
          <p className="eyebrow">ERIC BOB / DIGITAL HUB</p>
          <h1 id="home-title" tabIndex={-1}><span>探索我的數位世界</span></h1>
          <p className="lede">我是 Eric Bob。我做過台灣鐵道路網練習、穿搭工具，也和朋友一起做了能用積木寫 C++ 的網站。</p>
          <div className="actions">
            <a className="button primary" href="#work">查看作品 ↗</a>
            <a className="button" href="#about">認識我</a>
          </div>
        </div>
        <FeaturedCarousel active={active} />
      </div>
      <aside className="card home-announcement" aria-labelledby="announcement-title">
        <span className="tag" id="announcement-title">公告</span>
        <p>程式設計筆記已上線，攝影作品準備中。</p>
        <a href="#notes">閱讀筆記 <span aria-hidden="true">↗</span></a>
      </aside>
      <section className="home-projects" aria-labelledby="home-projects-title">
        <h2 id="home-projects-title">精選作品</h2>
        <div className="grid">
          {featuredProjects.map(project => (
            <a key={project.id} className="card project-preview" href={project.homepage}>
              <img src={project.preview || project.icon} alt="" />
              <div>
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Timeline() {
  const [selected, setSelected] = useState(timeline.at(-1));
  const { year, events } = selected;
  const entry = useRef(null);
  const [height, setHeight] = useState(null);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => setHeight(entry.current.offsetHeight));
    setHeight(entry.current.offsetHeight);
    observer.observe(entry.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="card timeline">
      <div className="timeline-heading">
        <h3>經歷時間軸</h3>
        <div className="timeline-controls" role="group" aria-label="選擇年份">
          {timeline.map(entry => (
            <button key={entry.year} type="button" aria-pressed={entry.year === year} aria-controls="timeline-events" onClick={() => setSelected(entry)}>{entry.year}</button>
          ))}
        </div>
      </div>
      <div className="timeline-viewport" style={{ height: height ?? "auto" }}>
        <article id="timeline-events" ref={entry} aria-live="polite">
          <div key={year} className="timeline-entry">
            <h4 className="year">{year}</h4>
            <ul>{events.map(event => <li key={event}>{event}</li>)}</ul>
          </div>
        </article>
      </div>
    </div>
  );
}

function About() {
  return (
    <>
      <p className="eyebrow">ABOUT / 01</p>
      <h2 id="about-title" tabIndex={-1}>關於我</h2>
      <article className="card profile">
        <img src={profile} alt="Eric Bob 的頭像" width="96" height="96" />
        <div>
          <h3>Eric Bob</h3>
          <p className="muted">我從 Scratch 和 Minecraft 附加包開始學程式，後來用 JavaScript 做出基岩版指令工具。現在我用 React 做鐵道路網練習，也曾和朋友用 Blockly 做 C++ 積木編輯器。</p>
          <ul className="tags" aria-label="實作用到的工具">
            {skills.map(skill => <li key={skill} className="tag">{skill}</li>)}
          </ul>
        </div>
      </article>
      <Timeline />
    </>
  );
}

function ProjectCard({ project, featured = false }) {
  const [dismissed, setDismissed] = useState(false);
  const Card = featured ? "a" : "article";

  return (
    <Card
      className={featured ? "card project featured-project" : "card project compact-project"}
      id={project.id}
      href={featured ? project.homepage : undefined}
      onPointerLeave={() => setDismissed(false)}
      onBlur={() => setDismissed(false)}
      onKeyDown={event => { if (event.key === "Escape") setDismissed(true); }}
    >
      {featured
        ? <img className="project-cover" src={project.cover || project.preview || project.icon} alt={project.previewAlt} />
        : project.icon
          ? <img className="project-icon" src={project.icon} alt="" />
          : <span className="project-symbol" aria-hidden="true">{project.symbol}</span>}
      <h4>{project.title}</h4>
      <p className="muted">{project.description}</p>
      {project.details && !dismissed && (
        <div className="project-detail-panel">
          <strong>{project.title}</strong>
          <p>{project.details}</p>
        </div>
      )}
    </Card>
  );
}

function Work() {
  return (
    <>
      <p className="eyebrow">PROJECTS / 02</p>
      <h2 id="work-title" tabIndex={-1}>作品集</h2>
      <section className="work-group" aria-labelledby="featured-title">
        <h3 id="featured-title">精選作品</h3>
        <div className="grid">{featuredProjects.map(project => <ProjectCard key={project.id} project={project} featured />)}</div>
      </section>
      <section className="work-group" aria-labelledby="tools-title">
        <h3 id="tools-title">其他工具與實作</h3>
        <div className="grid">{projects.filter(project => !project.id).map(project => <ProjectCard key={project.title} project={project} />)}</div>
      </section>
    </>
  );
}

function Photography() {
  return (
    <>
      <p className="eyebrow">PHOTOGRAPHY / 03</p>
      <h2 id="photography-title" tabIndex={-1}>攝影作品</h2>
        <div className="card photography-placeholder">
          <svg viewBox="0 0 32 32" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 9h6l2-4h8l2 4h6v18H4z" />
            <circle cx="16" cy="18" r="6" />
          </svg>
          <p>即將到來</p>
          <span lang="en">Coming Soon</span>
        </div>
    </>
  );
}

const notes = [
  {
    id: "BkIewSbjlg",
    title: "程式設計筆記總覽",
    label: "START HERE",
    status: "系列目錄",
    description: "從這裡開始，查看各語言的教學順序、筆記連結與編寫進度。",
  },
  {
    id: "B1C79whdxe",
    title: "JSON 教學筆記",
    label: "JSON",
    status: "已發布",
    description: "認識鍵值對、資料型態與格式限制，搭配範例練習 JSON.parse() 和 JSON.stringify()。",
  },
  {
    id: "rkIi-ztwgl",
    title: "Python 基礎教學",
    label: "PYTHON / BASIC",
    status: "已發布",
    description: "從環境安裝、輸入輸出開始，逐步認識變數、資料型態、型態轉換與運算子。",
  },
  {
    id: "r1Nr-PO5xx",
    title: "Java 教學",
    label: "JAVA",
    status: "持續編寫",
    description: "整理開發環境、主程式架構、輸出方式與資料型態，搭配程式範例理解基本語法。",
  },
  {
    id: "S1H3_GKPge",
    title: "C++ 教學",
    label: "C++",
    status: "內容整理中",
    description: "程式設計筆記系列的 C++ 篇，後續內容將在 HackMD 更新。",
  },
];

function Notes() {
  return (
    <>
      <p className="eyebrow">NOTES / 04</p>
      <h2 id="notes-title" tabIndex={-1}>筆記／實作紀錄</h2>
      <p className="notes-intro muted">把學習過程整理成可以回頭查閱的教學筆記，從語法概念到實際範例。</p>
      <section className="notes-category" aria-labelledby="programming-notes-title">
        <h3 id="programming-notes-title">程式設計</h3>
      <div className="grid notes-grid">
        {notes.map(note => (
          <a key={note.id} className="card note-card" href={`https://hackmd.io/@Coderex-bob/${note.id}`}>
            <div className="note-meta"><span>{note.label}</span><span className="tag">{note.status}</span></div>
            <h4>{note.title}</h4>
            <p className="muted">{note.description}</p>
            <span className="note-read">在 HackMD 閱讀 <span aria-hidden="true">↗</span></span>
          </a>
        ))}
        {["C", "Lua", "Rust", "Ruby"].map(language => (
          <article key={language} className="card note-card note-upcoming">
            <div className="note-meta"><span>{language.toUpperCase()}</span><span className="tag">即將到來</span></div>
            <h4>{language} 教學筆記</h4>
            <p className="muted">內容準備中</p>
            <span className="note-read" lang="en">Coming Soon</span>
          </article>
        ))}
      </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <p className="eyebrow">CONTACT / 05</p>
      <h2 id="contact-title" tabIndex={-1}>在哪裡找到我</h2>
      <div className="grid social-grid">
        <article className="card social-card">
          <span className="social-symbol" aria-hidden="true">DC</span>
          <h3>Discord</h3>
          <p className="muted">coderex._.bob</p>
        </article>
        <a className="card social-card" href="https://www.instagram.com/coderex._.bob/">
          <span className="social-symbol" aria-hidden="true">IG</span>
          <h3>Instagram</h3>
          <p className="muted">@coderex._.bob</p>
        </a>
        <a className="card social-card" href={youtubeUrl}>
          <span className="social-symbol" aria-hidden="true">YT</span>
          <h3>YouTube</h3>
          <p className="muted">鐵道影片 · @ericbob_metro</p>
        </a>
        <a className="card social-card" href={githubUrl}>
          <span className="social-symbol" aria-hidden="true">GH</span>
          <h3>GitHub</h3>
          <p className="muted">原始碼與專案 · EricbobXD</p>
        </a>
      </div>
      <section className="card feedback-placeholder" aria-labelledby="feedback-title">
        <h3 id="feedback-title">匿名回饋</h3>
        <p className="muted">回饋管道準備中，開放後可以在這裡分享網站建議。</p>
        <span className="tag">準備中</span>
      </section>
    </>
  );
}

const content = { home: Home, about: About, work: Work, photography: Photography, notes: Notes, contact: Contact };

const backgroundSnippets = [
  ["C", "int square(int n) { return n * n; }"],
  ["C++", "#include <array>\nstd::array<int, 3> stops{1, 2, 3};"],
  ["Rust", "fn square(n: i32) -> i32 { n * n }"],
  ["Ruby", "stations = %w[Taipei Banqiao Taoyuan]"],
  ["Java", "class Square {\n  static int of(int n) { return n * n; }\n}"],
  ["JavaScript", "const explore = () => 'Hello, world!';"],
  ["C#", "int Square(int n) => n * n;"],
  ["Python", "def square(n):\n    return n * n"],
  ["JSON", '{ "theme": "cyan", "ready": true }'],
  ["YAML", "project: hub\nfeatures:\n  - photography\n  - notes"],
  ["XML", '<project name="Hub"><status>ready</status></project>'],
  ["HTML", '<main><h1>Hello, world!</h1></main>'],
  ["CSS", ".card { border-radius: 1rem; }"],
  ["Go", "package main\nfunc square(n int) int { return n * n }"],
].concat([
  "{ }",
  "</>",
  "◇",
].map(symbol => ["", symbol]));

function BackgroundAccents() {
  const [accents, setAccents] = useState([]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval;
    let batch = 0;
    function updateMotion() {
      clearInterval(interval);
      setAccents([]);
      if (preference.matches) return;
      interval = setInterval(() => {
        if (document.hidden) return;
        const additions = Array.from({ length: 1 + batch++ % 2 }, (_, i) => ({
          id: `${Date.now()}-${i}`,
          snippet: backgroundSnippets[Math.floor(Math.random() * backgroundSnippets.length)],
          left: 3 + Math.random() * 60,
          top: 15 + Math.random() * 65,
        }));
        setAccents(previous => [...previous, ...additions].slice(-6));
      }, 14000 / 1.5);
    }
    updateMotion();
    preference.addEventListener("change", updateMotion);
    return () => {
      clearInterval(interval);
      preference.removeEventListener("change", updateMotion);
    };
  }, []);

  return (
    <div className="background-accents" aria-hidden="true">
      {accents.map(accent => (
        <code key={accent.id} style={{ left: `${accent.left}%`, top: `${accent.top}%` }}
          onAnimationEnd={() => setAccents(previous => previous.filter(item => item.id !== accent.id))}>
          {accent.snippet[0] && <span>{accent.snippet[0]}</span>}
          {accent.snippet[1]}
        </code>
      ))}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const [hash, setHash] = useState(() => window.location.hash);
  const main = useRef(null);
  const brand = useRef(null);
  const focusHeading = useRef(false);
  const [requestedPage, requestedProject] = hash.slice(1).split("/");
  const page = pages.some(([id]) => id === requestedPage) ? requestedPage : "home";
  const projectId = page === "work" && featuredProjects.find(project => project.id === requestedProject)?.id;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("hub-theme", theme);
    } catch {
      // Theme switching remains available when browser storage is disabled.
    }
  }, [theme]);

  useEffect(() => {
    function onHashChange() {
      focusHeading.current = main.current.contains(document.activeElement);
      setHash(window.location.hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const project = projectId && document.getElementById(projectId);
    if (project) {
      project.focus({ preventScroll: true });
      project.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
    if (!project && focusHeading.current) {
      document.getElementById(`${page}-title`).focus({ preventScroll: true });
    }
    focusHeading.current = false;
  }, [hash, page, projectId]);

  return (
    <>
      <BackgroundAccents />
      <header>
        <div className="wrap header-inner">
          <a className="brand" href="#home" ref={brand}><span className="mark" aria-hidden="true">EB</span> Eric Bob</a>
          <nav aria-label="主要導覽">
            {pages.map(([id, label, icon]) => (
              <a key={id} href={`#${id}`} aria-current={page === id ? "page" : undefined}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" aria-hidden="true">
                  <path d={icon} />
                </svg>
                {label}
              </a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "切換至淺色模式" : "切換至深色模式"}
            aria-pressed={theme === "light"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
            {theme === "dark" ? "淺色" : "深色"}
          </button>
        </div>
      </header>
      <main className="wrap" ref={main}>
        {pages.map(([id]) => {
          const Page = content[id];
          return <section key={id} id={id} aria-labelledby={`${id}-title`} hidden={page !== id}><Page active={page === id} /></section>;
        })}
      </main>
      <footer>
        <div className="wrap footer-inner">
          <p className="footer-credit"><strong>Eric Bob</strong><span>個人作品集</span></p>
          <div className="footer-links">
            <a href={githubUrl}>GitHub <span aria-hidden="true">↗</span></a>
            <a href={youtubeUrl}>YouTube <span aria-hidden="true">↗</span></a>
            <button type="button" onClick={() => {
              window.scrollTo(0, 0);
              brand.current.focus({ preventScroll: true });
            }}>回到頂端 <span aria-hidden="true">↑</span></button>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
