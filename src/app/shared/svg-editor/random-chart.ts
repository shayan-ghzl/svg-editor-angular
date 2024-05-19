import { select, Selection } from "d3";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawRandomChart(): void {
    const svgWidth = 500;
    const svgHeight = 300;

    const numOfSegments = svgWidth / 30;

    const chart: Selection<SVGSVGElement, unknown, HTMLElement, any> = select('#chart');

    chart.selectAll('rect').remove();
    chart.selectAll('text').remove();

    for (let i = 0; i < numOfSegments; i++) {
        const randomNumber= getRandomInt(10, svgHeight - 10);
        const barX= i * 30;
        const barY= svgHeight - randomNumber;

        chart.append('rect')
            .attr('x', barX)
            .attr('y', barY)
            .attr('width', 30)
            .attr('height', randomNumber)
            .attr('fill', 'steelblue')
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        chart.append('text')
            .attr('x', barX + 15)
            .attr('y', svgHeight - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .text(randomNumber);
    }
}

// --------------------------------

export function openDialog(): void {
    drawRandomChart();
    document.querySelector('.dialog')!.classList.toggle('d-none');
}