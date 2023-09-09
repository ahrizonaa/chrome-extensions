import { DSA } from './dsa-metadata';
class CustomDatastructureDropdown {
    constructor() { }
    Build() {
        let elements = [];
        for (let datastructure in DSA) {
            let header = document.createElement('li');
            let h6 = document.createElement('h6');
            h6.innerText =
                datastructure.slice(0, 1).toUpperCase() + datastructure.slice(1);
            h6.className = 'dropdown-header';
            let hr = document.createElement('hr');
            hr.className = 'dropdown-divider';
            header.appendChild(h6);
            elements.push(header);
            for (let inputtype in DSA[datastructure]) {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.setAttribute('class', 'block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 dropdown-item');
                a.dataset.teDropdownItemRef = '';
                a.href = '#';
                a.innerText = DSA[datastructure][inputtype].desc;
                a.setAttribute('dstype', datastructure);
                a.setAttribute('dsinputtypeoption', '');
                a.setAttribute('dsinputtype', inputtype);
                li.appendChild(a);
                elements.push(li);
            }
            elements.push(hr);
        }
        return elements;
    }
}
