// do load and then draw bar chart based off data i collect
// this particular one is top 20 racing games sales by video 

// VIS 1
// desc: bar chart of most popular racing games by sales
// whole point is that mario kart is number 1 and also holds
// a lot of top spots

// url1 nintendo website good: https://www.nintendo.co.jp/ir/en/finance/software/index.html

// VIS 2
// TBD

let svg1;
let svg2;

let data1;
let data1json = [];
let allBands1 = [];

let svgFirstDraw = true;

let scroll = 0


document.addEventListener('DOMContentLoaded', function () {} )
{
    // on load do data preprocess as well as draw
    Promise.all([d3.csv('data1.csv')])
        .then(function (values) {
            // have data loaded and look at values 
            
            data1 = values[0]

            // sort data
            parseFile()

            // draw data
            svg1 = d3.select("#svg1")
            barChartDrawInitial()
        });
}

addEventListener("scroll", (event) => {});

onscroll = (event) => {
    let yPos = window.scrollY

    let topGraphRect = document.getElementById("svg1").getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();

    let graphY = topGraphRect.top
    let bodyY = bodyRect.top

    console.log(graphY - bodyY)

    // get top of html element
    // add scrolly events

    if(graphY < 0)
    {
        console.log("animate bar chart")
        barChartDrawBars()
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        window.scrollTo(0, graphY - bodyY)
        svgFirstDraw = false
    }
    if(!svgFirstDraw)
    {
        // lock position 
    }
};

function parseFile()
{
    for(let i = 0; i < data1.length; i++)
    {
        allBands1.push(data1[i].Title)
    }
}

function barChartDrawInitial()
{
    // get height and width of svg
    let svgWidth = svg1.style('width').replace('px','');
    let svgHeight = svg1.style('height').replace('px','');

    // amount of pixels from edges of svg 
    let margin = 100;
    
    svgWidth = parseInt(svgWidth)
    svgHeight = parseInt(svgHeight)

    console.log(svgHeight)

    // set scales
    let bandScale1 = d3.scaleBand(allBands1, [margin, svgWidth - margin])
        .padding(0.2)

    let maxSales = 0;
    for(let i = 0; i < data1.length; i++)
    {
        console.log(parseFloat(data1[i].Sales))
        if(parseFloat(data1[i].Sales) > maxSales)
        {
            maxSales = parseFloat(data1[i].Sales)
        }
    }
    console.log(maxSales)

    let yScale = d3.scaleLinear([0, maxSales] ,[svgHeight, margin])

    let colorScale = d3.scaleOrdinal()
        .domain(["Gran", "Speed", "Mario"])
        .range(["green", "blue", "red"])

    // draw scales
    svg1.append("g")
        .attr("transform", "translate(0," + (svgHeight - (margin/2)) + ")")
        .call(d3.axisBottom(bandScale1))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-35)")
            .style("text-anchor", "end")
            .attr("font-family", "Lobster, cursive")
    svg1.append("g")
        .attr("transform", "translate(" + margin + ","  + (-margin/2) + ")    ")
        .call(d3.axisLeft(yScale))

}

function barChartDrawBars()
{
    // get height and width of svg
    let svgWidth = svg1.style('width').replace('px','');
    let svgHeight = svg1.style('height').replace('px','');

    // amount of pixels from edges of svg 
    let margin = 100;
    
    svgWidth = parseInt(svgWidth)
    svgHeight = parseInt(svgHeight)

    console.log(svgHeight)

    // set scales
    let bandScale1 = d3.scaleBand(allBands1, [margin, svgWidth - margin])
        .padding(0.2)

    let maxSales = 0;
    for(let i = 0; i < data1.length; i++)
    {
        console.log(parseFloat(data1[i].Sales))
        if(parseFloat(data1[i].Sales) > maxSales)
        {
            maxSales = parseFloat(data1[i].Sales)
        }
    }
    console.log(maxSales)

    let yScale = d3.scaleLinear([0, maxSales] ,[svgHeight, margin])

    let colorScale = d3.scaleOrdinal()
        .domain(["Gran", "Speed", "Mario"])
        .range(["green", "blue", "red"])

    // draw bars

    svg1.selectAll("bars")
        .data(data1)
        .join(
            enter => enter.append("rect")
                .attr("x", function(d) {return (bandScale1(d.Title) + 10) })
                .attr("y", function(d) {return (svgHeight - (margin/2))})
                .attr("width", 10)
                .attr("fill", function(d) {return colorScale(d.Type)})
                .attr("stroke", "black")
                .transition()
                .duration(750)
                .attr("y", function(d) {return (yScale(d.Sales) - (margin/2))})
                .attr("height", function(d) {return (svgHeight - yScale(d.Sales))}),
            update => update,
            exit => exit
        )
}