import d3 from "d3";
/* eslint-disable */
export function tree(lection, cb) {
  let margin = { top: 20, right: 120, bottom: 20, left: 120 },
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom

  let i = 0,
    duration = 750,
    root

  const tree = d3.layout.tree().size([height, width])

  let diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.y, d.x]
  })

  const lection_tree = document.querySelector('#svg')

  if (lection_tree) {
    lection_tree.remove()
  }

  let svg = d3
    .select('.tree-container')
    .append('svg')
    .attr('id', 'svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  //d3.json("/d/4063550/flare.json", function(error, flare) {
  // root = flare
  root = lection
  root.x0 = height / 2
  root.y0 = 0

  function collapse(d) {
    if (d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }

  root.children.forEach(collapse)
  update(root)
  //});

  d3.select(self.frameElement).style('height', '800px')

  function update(source) {
    // Compute the new tree layout.
    let nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes)

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
      d.y = d.depth * 180
    })

    // Update the nodes…
    let node = svg.selectAll('g.node').data(nodes, function (d) {
      return d.id || (d.id = ++i)
    })

    // Enter any new nodes at the parent's previous position.
    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')'
      })
      .on('click', click)

    nodeEnter
      .append('circle')
      .attr('r', 1e-6)
      .style('fill', function (d) {
        return d._children ? 'lightsteelblue' : '#fff'
      })

    nodeEnter
      .append('text')
      .attr('x', function (d) {
        return d.children || d._children ? -10 : 10
      })
      .attr('dy', '.35em')
      .attr('text-anchor', function (d) {
        return d.children || d._children ? 'end' : 'start'
      })
      .text(function (d) {
        return d.name || d.title
      })
      .style('fill-opacity', 1e-6)

    // Transition nodes to their new position.
    let nodeUpdate = node
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + d.y + ',' + d.x + ')'
      })

    nodeUpdate
      .select('circle')
      .attr('r', 4.5)
      .style('fill', function (d) {
        return d._children ? 'lightsteelblue' : '#fff'
      })

    nodeUpdate.select('text').style('fill-opacity', 1)

    // Transition exiting nodes to the parent's new position.
    let nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + source.y + ',' + source.x + ')'
      })
      .remove()

    nodeExit.select('circle').attr('r', 1e-6)

    nodeExit.select('text').style('fill-opacity', 1e-6)

    // Update the links…
    let link = svg.selectAll('path.link').data(links, function (d) {
      return d.target.id
    })

    // Enter any new links at the parent's previous position.
    link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function (d) {
        let o = { x: source.x0, y: source.y0 }
        return diagonal({ source: o, target: o })
      })

    // Transition links to their new position.
    link
      .transition()
      .duration(duration)
      .attr('d', diagonal)

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        let o = { x: source.x, y: source.y }
        return diagonal({ source: o, target: o })
      })
      .remove()

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children
      d.children = null
    } else {
      d.children = d._children
      d._children = null
      if (!d.children) {
        const telegraphUrl = d.url
        if (telegraphUrl) {
          window.open(telegraphUrl, '_blank')
        }
      }
    }
    /*
  root.children.forEach(function(node) {
      console.log(node, d, node === d);
      //collapse(node);
  });*/
    update(d)
  }

  cb()
}
