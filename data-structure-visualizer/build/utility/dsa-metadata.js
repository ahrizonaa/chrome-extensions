import { g_al_uw, g_al_w, g_am_uw, l_a, q_a, s_a, t_a } from './dsa-input-description';
class DataStructureRepresentation {
    constructor(name, desc, placeholder, placeholder2 = undefined) {
        this.name = name;
        this.desc = desc;
        this.placeholder = placeholder;
        this.placeholder2 = placeholder2;
    }
    findPlaceholder(weighted) {
        return weighted
            ? this.placeholder2
                ? this.placeholder2
                : this.placeholder
            : this.placeholder;
    }
}
class DataStructureRepresentations {
    constructor() {
        this.setDefaults();
    }
    findPlaceholder(dsaType, dsaFormat, opts) {
        return this[dsaType][dsaFormat].findPlaceholder(opts.weighted);
    }
    setDefaults() {
        this.graph = {
            adjacency_list: new DataStructureRepresentation('adjacency_list', 'Adjacency List', g_al_uw, g_al_w),
            adjacency_matrix: new DataStructureRepresentation('adjacency_matrix', 'Adjacency Matrix', g_am_uw)
        };
        this.tree = {
            tree_array: new DataStructureRepresentation('tree_array', 'Array', t_a)
        };
        this.stack = {
            stack_array: new DataStructureRepresentation('stack_array', 'Array', s_a)
        };
        this.queue = {
            queue_array: new DataStructureRepresentation('queue_array', 'Array', q_a)
        };
        this.linkedlist = {
            linkedlist_array: new DataStructureRepresentation('linkedlist_array', 'Array', l_a)
        };
    }
}
class GraphOptions {
    constructor() {
        this.directed = false;
        this.weighted = false;
    }
}
class TreeOptions {
    constructor() {
        this.binary = false;
        this.nary = false;
        this.nulls = false;
    }
}
class StackOptions {
}
class QueueOptions {
}
class LinkedListOptions {
    constructor() {
        this.doubly = false;
    }
}
class DataStructureOptions {
    constructor() {
        this.graph = new GraphOptions();
        this.tree = new TreeOptions();
        this.stack = new StackOptions();
        this.queue = new QueueOptions();
        this.linkedlist = new LinkedListOptions();
    }
}
class CanvasAesthetics {
    constructor() {
        this.CanvasBgColor = '#101010';
        this.EdgeColor = '#EEEEEE';
        this.NodeColor = '#141824';
        this.NodeFontSize = '16px';
        this.NodeFontFamily = 'monospace';
        this.NodeFontColor = '#EEEEEE';
        this.ArrowheadSize = 10;
    }
}
class DataStructureSelection {
    constructor() {
        this.dsaType = '';
        this.dsaFormat = '';
    }
}
class DataStructureRadioOption {
}
const DSA = new DataStructureRepresentations();
const Aesthetics = new CanvasAesthetics();
const UserSelection = new DataStructureSelection();
const UserOptions = new DataStructureOptions();
export { DSA, Aesthetics, DataStructureOptions, DataStructureSelection, DataStructureRepresentations, DataStructureRadioOption, UserSelection, UserOptions };
//# sourceMappingURL=dsa-metadata.js.map