// =========================
// PENNY ONBOARDING LOGIC
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENT REFERENCES
  // =========================

  const welcomeScreen =
    document.getElementById("welcomeScreen");

  const scanScreen =
    document.getElementById("scanScreen");

  const scanBtn =
    document.getElementById("scanBtn");

  const backBtn =
    document.getElementById("backBtn");

  const initBtn =
    document.getElementById("initBtn");

  const step1 =
    document.getElementById("step1");

  const step2 =
    document.getElementById("step2");

  const progressBar =
    document.getElementById("progressBar");

  const auditStatus =
    document.getElementById("auditStatus");

  const cpuData =
    document.getElementById("cpuData");

  const ramData =
    document.getElementById("ramData");

  const osData =
    document.getElementById("osData");

  const cards =
    document.querySelectorAll(".card");

  const scanPenny =
    document.querySelector(
      "#scanScreen .penny"
    );

  // =========================
  // INITIAL STATE
  // =========================

  progressBar.style.width = "50%";

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform =
      "translateY(20px)";
  });

  // =========================
  // SCREEN SWITCH
  // =========================

  function showScreen(screen) {

    welcomeScreen.classList.remove(
      "active"
    );

    scanScreen.classList.remove(
      "active"
    );

    screen.classList.add(
      "active"
    );
  }

  // =========================
  // STEP UPDATE
  // =========================

  function updateStep(step) {

    step1.classList.remove(
      "active"
    );

    step2.classList.remove(
      "active"
    );

    if(step === 1){

      step1.classList.add(
        "active"
      );

      progressBar.style.width =
        "50%";

    }

    if(step === 2){

      step2.classList.add(
        "active"
      );

      progressBar.style.width =
        "75%";
    }
  }

  // =========================
  // AUDIT ANIMATION
  // =========================

  async function runAudit() {

    try {

      auditStatus.textContent =
        "Preparing hardware scan...";

      const auditSteps = [

        "Checking compute matrix...",

        "Inspecting memory pools...",

        "Verifying local storage...",

        "Optimizing runtime architecture...",

        "Finalizing compatibility profile..."
      ];

      for (let i = 0;
           i < auditSteps.length;
           i++) {

        auditStatus.textContent =
          auditSteps[i];

        await wait(900);
      }

      const info =
        await window.pennyAPI
        .getHardwareAudit();

      cpuData.innerHTML =
        `
        ${info.cores} cores
        <br>
        ${info.cpu}
        `;

      ramData.textContent =
        info.ram;

      osData.innerHTML =
        `
        ${info.platform}
        <br>
        ${info.architecture}
        `;

      revealCards();

      progressBar.style.width =
        "100%";

      auditStatus.textContent =
        "Audit complete. Penny is ready.";

      console.log(
        "Audit completed",
        info
      );

    } catch(error){

      console.error(error);

      auditStatus.textContent =
        "Audit failed.";
    }
  }

  // =========================
  // CARD REVEAL
  // =========================

  function revealCards() {

    cards.forEach(
      (card,index) => {

        setTimeout(() => {

          card.style.transition =
            ".35s ease";

          card.style.opacity =
            "1";

          card.style.transform =
            "translateY(0)";

        }, index * 180);

      }
    );
  }

  // =========================
  // WAIT HELPER
  // =========================

  function wait(ms){

    return new Promise(
      resolve =>
        setTimeout(
          resolve,
          ms
        )
    );
  }

  // =========================
  // INITIALIZATION MODAL
  // =========================

  function createInitModal() {

    const modal =
      document.createElement(
        "div"
      );

    modal.className =
      "init-modal";

    modal.innerHTML =

    `
    <div class="init-card">

      <h2>
      Initializing Penny
      </h2>

      <div
      id="initLogs"
      class="init-logs">
      </div>

    </div>
    `;

    document.body.appendChild(
      modal
    );

    return modal;
  }

  // =========================
  // CORE INITIALIZATION
  // =========================

  async function initializeCore() {

    const modal =
      createInitModal();

    const logs =
      modal.querySelector(
        "#initLogs"
      );

    const steps = [

      "Loading Runtime",

      "Mounting Local AI",

      "Building Financial Graph",

      "Initializing Ledger Engine",

      "Preparing Memory Context",

      "Optimizing Inference Pipeline",

      "Loading Penny Personality",

      "Final System Checks",

      "Ready"
    ];

    for (let step of steps){

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "init-log";

      item.innerHTML =
        `✓ ${step}`;

      logs.appendChild(
        item
      );

      await wait(700);
    }

    console.log(
      "PENNY CORE READY"
    );

    setTimeout(() => {

      alert(
        "Penny is ready 🚀"
      );

      modal.remove();

    }, 1000);
  }

  // =========================
  // BUTTON EVENTS
  // =========================

  scanBtn.addEventListener(
    "click",
    async () => {

      showScreen(
        scanScreen
      );

      updateStep(
        2
      );

      if(scanPenny){

        scanPenny.classList.add(
          "thinking"
        );
      }

      await runAudit();
    }
  );

  backBtn.addEventListener(
    "click",
    () => {

      showScreen(
        welcomeScreen
      );

      updateStep(
        1
      );

      cards.forEach(card => {

        card.style.opacity =
          "0";

        card.style.transform =
          "translateY(20px)";
      });

      auditStatus.textContent =
        "Running audit...";
    }
  );

  initBtn.addEventListener(
    "click",
    initializeCore
  );

});