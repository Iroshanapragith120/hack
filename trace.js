const blessed = require('blessed');
const contrib = require('blessed-contrib');
const chalk = require('chalk');

const screen = blessed.screen({ smartCSR: true, title: 'SL-HACKER SATELLITE TRACE' });
const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

// UI Widgets
const map = grid.set(0, 0, 8, 8, contrib.map, { label: chalk.red(' GLOBAL SATELLITE SCAN ') });
const log = grid.set(8, 0, 4, 12, contrib.log, { label: chalk.green(' SYSTEM LOG '), fg: "green" });
const status = grid.set(0, 8, 4, 4, contrib.markdown, { label: chalk.yellow(' TARGET INFO ') });
const gauge = grid.set(4, 8, 4, 4, contrib.gauge, { label: chalk.cyan(' SIGNAL STRENGTH '), percent: 0 });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runAnimation() {
    log.log(chalk.white(">> Initializing Satellite Uplink..."));
    await sleep(1500);

    // 1. Global Scan
    log.log(chalk.green(">> Scanning Global Grids..."));
    for (let i = 0; i <= 100; i += 20) {
        gauge.setData(i);
        screen.render();
        await sleep(800);
    }

    // ලංකාවේ Coordinates (7.8731, 80.7718)
    log.log(chalk.red(">> MATCH FOUND: SRI LANKA REGION"));
    map.addMarker({ "lat": "7.8731", "lon": "80.7718", color: 'red', char: 'X' });
    status.setMarkdown(`##\n\n****: Sri Lanka\n****: Locking...\n****: 103.21.164.${Math.floor(Math.random()*255)}`);
    screen.render();
    await sleep(2000);

    // 2. Zoom Animation (ASCII ලංකා සිතියම පෙන්වීම)
    log.log(chalk.yellow(">> Zooming into Sri Lanka Grid..."));
    const lankaMap = `
           ${chalk.red.bold("🔴 TARGET LOCKED")}
    
              ${chalk.green("&&")}
             ${chalk.green("&&&&&")}
            ${chalk.green("&&&&&&&")}
           ${chalk.green("&&&&&&&&&")}
           ${chalk.green("&&&&&&&&&&")}
            ${chalk.green("&&&&&&&&&")}
             ${chalk.green("&&&&&&&")}
              ${chalk.green("&&&&&")}
               ${chalk.green("&&&")}
                ${chalk.green("&")}
    `;
    
    // ලංකාව මැදට Zoom වුණාම පෙන්වන දේ
    const zoomBox = grid.set(0, 0, 8, 8, blessed.box, {
        content: lankaMap,
        align: 'center',
        valign: 'middle',
        border: { type: 'line' },
        style: { border: { fg: 'red' } }
    });
    
    screen.render();
    log.log(chalk.red.bold(">> LOCATION IDENTIFIED: COLOMBO, DISTRICT 07"));
    log.log(chalk.white(">> Uploading Keylogger... 100%"));
    
    await sleep(3000);
    log.log(chalk.cyan.bold(">> DONE. YOU ARE BEING WATCHED! 😂👊"));
}

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
runAnimation();
