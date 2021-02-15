function dfs(graph, root = null) {

    let path = {}
    let stack = []
    let visited = {}

    if (root == null) {
        root = graph.keys[0];
    }
    stack.push(root);

    while (stack.length) {
        node = stack.pop();
        visited[node] = true;

        if (!graph.hasOwnProperty(node))
            continue;

        for (var i = 0; i < graph[node].length; i++) {
            if (!visited.hasOwnProperty(graph[node][i])) {
                path[graph[node][i]] = node;
                stack.push(graph[node][i])
            }
        }
    }

    return path;
}


function visualize(graph, wrapper, root = null) {

    let path = {};
    let queue = [];
    let visited = {};

    if (root == null) {
        root = graph.keys[0];
    }
    queue.unshift(root);

    while (queue.length) {

        node = queue.pop();

        if (!visited.hasOwnProperty(node)) {
            let level = 1;
            let temp_node = node
            while (path.hasOwnProperty(temp_node)) {
                level++
                temp_node = path[temp_node]
            }

            let top = level * 100 + (20 * (level - 1));
            
            let no_node = wrapper.find(`.level-${level}`).length;
            let left = wrapper.width() / (no_node + 2);

            if (no_node > 0) {
                nodes = wrapper.find(`.level-${level}`);
                for (let i = 0; i < nodes.length; i++) {
                    $(nodes[i]).css({
                        'position': 'absolute',
                        'top': top,
                        'left': left,
                        'border': '1px solid black',
                        'padding': '5px 15px',
                        'border-radius': '20px'
                    });
                    left += wrapper.width() / (no_node + 2);
                }
            }
    
            $(document.createElement('div'))
                .addClass(`level-${level}`)
                .appendTo(wrapper)
                .text(node)
                .css({
                    'position': 'absolute',
                    'top': top,
                    'left': left,
                    'border': '1px solid black',
                    'padding': '5px 15px',
                    'border-radius': '20px'
                });
        }

        visited[node] = true;

        if (!graph.hasOwnProperty(node))
            continue;

        for (var i = 0; i < graph[node].length; i++) {
            if (!visited.hasOwnProperty(graph[node][i])) {
                path[graph[node][i]] = node;
                queue.unshift(graph[node][i])
            }
        }
    }
}


jQuery.fn.dfs_widget = function() {

    const graph = {
        1: [2, 3],
        2: [4],
        3: [5],
        4: [5]
    }
    
    this.css({
        'position': 'relative'
    });
    visualize(graph, this, 1);
}
