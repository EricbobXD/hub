import { useEffect, useRef, useState } from "react";
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
  ["home", "首頁"],
  ["about", "關於我"],
  ["work", "作品集"],
  ["contact", "聯絡我"],
];

const skills = ["HTML / CSS", "JavaScript", "React", "Python", "Blockly"];
const githubUrl = "https://github.com/EricbobXD";
const youtubeUrl = "https://www.youtube.com/@ericbob_metro";

const timeline = [
  { year: 2023, events: ["參加 Minecraft × Python 程式設計課程"] },
  { year: 2024, events: ["臺北市 STEAM 跨域龍舟競賽第二名", "台灣仿生設計競賽高中職組全國決賽入選"] },
  { year: 2025, events: ["仰望盃全國科學 HomeRun 實作大賽銅牌獎、第六名", "參加 TOI 初試", "C++ Blockly 專題獲中學生網站小論文甲等", "完成 AIS3 Juniors 高中職資安課程"] },
];

const projects = [
  {
    id: "rail-sprint",
    title: "站站練習 Rail Sprint",
    preview: railMap,
    previewAlt: "站站練習的雙北與桃園路網圖",
    description: "透過站名填空、最少站數和轉乘挑戰熟悉台灣鐵道路網。",
    details: "可拖曳、縮放路線圖。最少站數模式接受等長的最短路徑。",
    links: [["看 Rail Sprint 原始碼", "https://github.com/EricbobXD/Metro_guest"]],
  },
  {
    id: "yixu",
    title: "衣序 YIXU",
    icon: clothing,
    cover: yixuPreview,
    previewAlt: "衣序的穿搭設定、指定單品與搭配提案介面",
    description: "管理自己的衣櫥，依天氣、場合和心情取得穿搭提案。",
    details: "源自程式設計課的團隊專題「智能衣櫃」，我負責前端、互動邏輯與資料串接。現在的衣序可框選衣物照片擷取主色，並將衣櫥保存在瀏覽器。",
    links: [["開啟衣序", "https://ericbobxd.github.io/school.clothing_ai_chose/"]],
  },
  {
    id: "cpp-blockly",
    title: "C++ Blockly",
    icon: blockly,
    cover: blocklyEditor,
    previewAlt: "C++ Blockly 編輯器，左側是積木分類，中間是工作區，右側是操作面板",
    description: "和 bosen-you 合作，把 C++ 語法做成可以拖曳組合的積木。",
    details: "我們想讓初學者用熟悉的積木方式練習 C++，因此用 JavaScript 把工作區裡的積木轉成程式碼。收到教學不夠直觀的回饋後，我們調整了操作面板，讓工作區留出更多空間，也改善了教學提示。",
    links: [["看 C++ Blockly 原始碼", "https://github.com/EricbobXD/C_plus_plus_Blockly"]],
  },
  {
    title: "仰望盃 HomeRun",
    icon: homeRun,
    description: "團隊製作的聲音辨識防詐原型。我負責初版網頁、初步加密程式與裝置動態測試。",
    links: [["看 HomeRun 專案", "https://github.com/EricbobXD/homerun"]],
  },
  {
    title: "Minecraft 指令工具",
    icon: give,
    description: "為基岩版製作的物品發放及文字顯示指令生成器。",
    links: [
      ["開啟 /give 工具", "https://ericbobxd.github.io/mcpe.cmd-give/"],
      ["開啟文字指令工具", "https://ericbobxd.github.io/mcpe.cmd-title-tellraw-titleraw/"],
    ],
  },
  {
    title: "UUID 與密碼生成器",
    icon: uuid,
    description: "在瀏覽器裡產生 UUID 或密碼的小工具。",
    links: [["開啟生成器", "https://ericbobxd.github.io/UUID-Password/"]],
  },
];

const featuredProjects = projects.filter(project => project.id);

function Home() {
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
        <a className="card hero-feature" href="#work/rail-sprint">
          <p className="eyebrow">FEATURED PROJECT</p>
          <img src={railMap} alt="站站練習的雙北與桃園路網圖，顯示市中心車站與轉乘關係" width="1280" height="720" />
          <h2>站站練習 Rail Sprint <span aria-hidden="true">↗</span></h2>
          <p className="muted">用填空與轉乘挑戰熟悉台灣鐵路</p>
        </a>
      </div>
      <section className="home-projects" aria-labelledby="home-projects-title">
        <h2 id="home-projects-title">精選作品</h2>
        <div className="grid">
          {featuredProjects.map(project => (
            <a key={project.id} className="card project-preview" href={`#work/${project.id}`}>
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
      <article id="timeline-events" aria-live="polite">
        <h4 className="year">{year}</h4>
        <ul>{events.map(event => <li key={event}>{event}</li>)}</ul>
      </article>
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
      <article className="card timeline">
        <h3>教學與社團</h3>
        <p className="muted">在 WFTRC 擔任 Python 教學長，協助同學處理安裝與解題問題，也參與教材編輯。在「IoT 初探」自走車活動中，我協助排除程式與設備故障，並撰寫課程介紹網頁。</p>
      </article>
      <Timeline />
    </>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={featured ? "card project featured-project" : "card project compact-project"} id={project.id} tabIndex={featured ? -1 : undefined}>
      {featured
        ? <img className="project-cover" src={project.cover || project.preview || project.icon} alt={project.previewAlt} />
        : <img className="project-icon" src={project.icon} alt="" />}
      <h4>{project.title}</h4>
      <p className="muted">{project.description}</p>
      {project.details && <details name="project-details"><summary>作品細節</summary><p>{project.details}</p></details>}
      {project.links.map(([label, href]) => <a key={href} href={href}>{label} ↗</a>)}
    </article>
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

function Contact() {
  return (
    <>
      <p className="eyebrow">CONTACT / 03</p>
      <h2 id="contact-title" tabIndex={-1}>在哪裡找到我</h2>
      <div className="grid contact-grid">
        <a className="card contact-card" href={githubUrl}>
          <h3>GitHub <span aria-hidden="true">↗</span></h3>
          <p className="muted">看原始碼與專案</p>
          <p className="handle">EricbobXD</p>
        </a>
        <a className="card contact-card" href={youtubeUrl}>
          <h3>YouTube <span aria-hidden="true">↗</span></h3>
          <p className="muted">看鐵道影片</p>
          <p className="handle">@ericbob_metro</p>
        </a>
      </div>
    </>
  );
}

const content = { home: Home, about: About, work: Work, contact: Contact };

function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const main = useRef(null);
  const brand = useRef(null);
  const focusHeading = useRef(false);
  const [requestedPage, requestedProject] = hash.slice(1).split("/");
  const page = pages.some(([id]) => id === requestedPage) ? requestedPage : "home";
  const projectId = page === "work" && featuredProjects.find(project => project.id === requestedProject)?.id;

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
    main.current.querySelectorAll('details[name="project-details"]').forEach(details => {
      details.open = Boolean(project && project.contains(details));
    });
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
      <header>
        <div className="wrap header-inner">
          <a className="brand" href="#home" ref={brand}><span className="mark" aria-hidden="true">EB</span> Eric Bob</a>
          <nav aria-label="主要導覽">
            {pages.map(([id, label]) => (
              <a key={id} href={`#${id}`} aria-current={page === id ? "page" : undefined}>{label}</a>
            ))}
          </nav>
        </div>
      </header>
      <main className="wrap" ref={main}>
        {pages.map(([id]) => {
          const Page = content[id];
          return <section key={id} id={id} aria-labelledby={`${id}-title`} hidden={page !== id}><Page /></section>;
        })}
      </main>
      <footer>
        <div className="wrap footer-inner">
          <p><strong>Eric Bob</strong> · 個人作品集</p>
          <div className="footer-links">
            <a href={githubUrl}>GitHub</a>
            <a href={youtubeUrl}>YouTube</a>
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
