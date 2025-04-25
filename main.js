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

let data2;

let svgFirstDraw = true;


document.addEventListener('DOMContentLoaded', function () {} )
{
    // on load do data preprocess as well as draw
    Promise.all([d3.csv('data1.csv'), d3.csv("track_wr.csv")])
        .then(function (values) {
            // have data loaded and look at values 
            
            data1 = values[0]
            data2 = values[1]

            // sort data
            parseFile()

            // draw data
            svg1 = d3.select("#svg1")
            svg2 = d3.select("#svg2")
            barChartDrawInitial()

            wrTimesDraw()
        });
}

addEventListener("scroll", (event) => {});

onscroll = (event) => {
    // console.log(window.scrollY)

    // add scrolly events
    if(window.scrollY > 1000 && window.scrollY < 1200 & svgFirstDraw)
    {
        console.log("animate bar chart")
        barChartDrawBars()
        svgFirstDraw = false
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
    let botMargin = 50;
    
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

    let yScale = d3.scaleLinear([0, maxSales] ,[svgHeight - botMargin, margin])

    let colorScale = d3.scaleOrdinal()
        .domain(["Gran", "Speed", "Mario"])
        .range(["green", "blue", "red"])

    // draw scales
    svg1.append("g")
        .attr("transform", "translate(0," + (svgHeight - botMargin - (margin/2)) + ")")
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
    let botMargin = 50;
    
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

    let yScale = d3.scaleLinear([0, maxSales] ,[svgHeight - botMargin, margin])

    let colorScale = d3.scaleOrdinal()
        .domain(["Gran", "Speed", "Mario"])
        .range(["green", "blue", "red"])

    // draw bars

    svg1.selectAll("bars")
        .data(data1)
        .join(
            enter => enter.append("rect")
                .attr("x", function(d) {return (bandScale1(d.Title) + 10) })
                .attr("y", function(d) {return (svgHeight - botMargin - (margin/2))})
                .attr("width", 10)
                .attr("fill", function(d) {return colorScale(d.Type)})
                .attr("stroke", "black")
                .transition()
                .duration(750)
                .attr("y", function(d) {return (yScale(d.Sales) - (margin/2))})
                .attr("height", function(d) {return (svgHeight - botMargin - yScale(d.Sales))}),
            update => update,
            exit => exit
        )
}


// second svg draw
function wrTimesDraw()
{
    let svgWidth = svg1.style('width').replace('px','');
    let svgHeight = svg1.style('height').replace('px','');

    // amount of pixels from edges of svg 
    let margin = 100;

    for(let i = 0; i < data2.length; i++)
    {
        console.log(data2[i]["Time"])
    }
    
    // parse data for date and time scales

}
