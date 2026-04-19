const blessed = require('blessed');
const contrib = require('blessed-contrib');
const chalk = require('chalk');

const screen = blessed.screen({ smartCSR: true, title: 'SL-HACKER SATELLITE TRACE' });
const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

// UI Widgets
const map = grid.set(0, 0, 8, 8, contrib.map, { label: chalk.red(' GLOBAL SCAN ') });
const log = grid.set(8, 0, 4, 12, contrib.log, { label: chalk.green(' SYSTEM LOG '), fg: "green" });
const status = grid.set(0, 8, 4, 4, contrib.markdown, { label: chalk.yellow(' TARGET INFO ') });
const gauge = grid.set(4, 8, 4, 4, contrib.gauge, { label: chalk.cyan(' UPLINK '), percent: 0 });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runAnimation() {
    log.log(chalk.white(">> Initializing Satellite..."));
    await sleep(2000);

    // 1. World Scan Animation
    log.log(chalk.cyan(">> Searching Satellite Grids..."));
    for (let i = 0; i <= 20; i++) {
        map.addMarker({ "lat": (Math.random() * 180 - 90).toString(), "lon": (Math.random() * 360 - 180).toString(), color: 'yellow' });
        gauge.setData(i * 5);
        screen.render();
        await sleep(300);
    }

    log.log(chalk.red.bold(">> MATCH FOUND: SRI LANKA GRID"));
    await sleep(2000);

    // 2. High-Detail Sri Lanka ASCII Map (ඔබ එවූ රූපයට සමාන හැඩය)
    const detailedLanka = `
             ${chalk.red.bold("📍 TARGET LOCKED")}

                 ${chalk.green("▓▓")}
                ${chalk.green("▓▓▓▓")}
               ${chalk.green("▓▓▓▓▓▓")}
              ${chalk.green("▓▓▓▓▓▓▓▓")}
             ${chalk.green("▓▓▓▓▓▓▓▓▓▓")}
            ${chalk.green("▓▓▓▓▓▓▓▓▓▓▓▓")}
            ${chalk.green("▓▓▓▓▓▓▓▓▓▓▓▓")}
            ${chalk.green("▓▓▓▓▓▓▓▓▓▓▓▓")}
             ${chalk.green("▓▓▓▓▓▓▓▓▓▓")}
              ${chalk.green("▓▓▓▓▓▓▓▓")}
               ${chalk.green("▓▓▓▓▓▓")}
                ${chalk.green("▓▓▓▓")}
                 ${chalk.green("▓▓")}
                  ${chalk.green("░")}

        ${chalk.white.bold("REGION: SRI LANKA [SEC-07]")}
    `;

    // සිතියම මැදට දමන Box එක
    const zoomBox = grid.set(0, 0, 8, 8, blessed.box, {
        content: detailedLanka,
        align: 'center',
        valign: 'middle',
        border: { type: 'line' },
        style: { border: { fg: 'red' } }
    });

    status.setMarkdown(`##\n\n****: Sri Lanka\n****: ${Math.floor(Math.random()*9999)}\n****: 112.134.1.${Math.floor(Math.random()*255)}`);
    screen.render();
    log.log(chalk.yellow(">> Zooming into 800%..."));
    await sleep(3000);

    // 3. Final Logging Progress
    let progress = 0;
    while (progress <= 100) {
        log.log(chalk.green(`>> Extracting Packets: ${progress}%`));
        gauge.setData(progress);
        screen.render();
        await sleep(2500); 
        progress += 5;
        
        if(progress === 50) log.log(chalk.red(">> BYPASSING GOVERNMENT FIREWALL..."));
        if(progress === 90) log.log(chalk.magenta(">> LOCATION PINPOINTED: COLOMBO"));
    }

    log.log(chalk.cyan.bold(">> SUCCESS. SYSTEM OWNED."));
    await sleep(5000);
    process.exit(0);
}

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
runAnimation();
