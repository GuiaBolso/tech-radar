const QUADRANT = {
    framework: 2,
    language: 0,
    data: 3,
    infra: 1,
};

const RING = {
    hold: 3,
    assess: 2,
    trial: 1,
    adopt: 0
};

async function loadData() {
    const data = await fetch("techs.csv");

    if(data.status >= 200 && data.status < 400) {
        return data.text();
    }

    throw new Error("Cannot load data");
}

async function prepareData(text) {
    const lines = text.split(/\r?\n/gi);
    const lineFields = lines.map(l => l.split(/;/gi));
    return lineFields.slice(1);
}

async function generateEntries(data) {
    return data
    .filter(d => !!d[0])
    .reduce((acc, curr) => (
        [...acc, {
            label:  `${curr[0]}`,
            quadrant: QUADRANT[curr[1]],
            ring: RING[curr[2]],
            active: true,
            moved: 0
        }]
    ),[])
}

function renderChart(entries) {
    radar_visualization({
        svg_id: "radar",
        width: 1450,
        height: 1000,
        colors: {
          background: "#fff",
          grid: "#bbb",
          inactive: "#ddd"
        },
        title: "Guiabolso Tech Radar",
        quadrants: [
          { name: "Linguagens" },
          { name: "Infraestrutura" },
          { name: "Frameworks" },
          { name: "Gerenciamento de Dados" }
        ],
        rings: [
          { name: "ADOPT", color: "#93c47d" },
          { name: "TRIAL", color: "#93d2c2" },
          { name: "ASSESS", color: "#fbdb84" },
          { name: "HOLD", color: "#efafa9" }
        ],
        print_layout: true,
        // zoomed_quadrant: 0,
        //ENTRIES
        entries /* [
            {
              label: "Kotlin",
              quadrant: 0,
              ring: 0,
              active: true,
              moved: 0
            },
            {
              label: "Kotlintest",
              quadrant: 2,
              ring: 1,
              active: true,
              moved: 0
            },
            {
              label: "Protocolo de Eventos",
              quadrant: 3,
              ring: 0,
              active: true,
              moved: 0
            },
            {
              label: "AWS KMS",
              quadrant: 1,
              ring: 0,
              active: true,
              moved: 0
            }
        ]*/
        //ENTRIES
      });
}

loadData()
    .then(prepareData)
    .then(generateEntries)
    .then(renderChart);