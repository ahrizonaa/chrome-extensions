import { DSA } from './dsa-metadata';

class DatastructureDropdown {
	static Create(): void {
		let elements: HTMLElement[] = [];

		for (let datastructure in DSA) {
			let headerLi = document.createElement('li');
			headerLi.className = 'dropdown-header';
			let h6 = document.createElement('h6');
			h6.innerText =
				datastructure.slice(0, 1).toUpperCase() + datastructure.slice(1);
			h6.setAttribute(
				'class',
				'block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-semibold text-neutral-500 dark:text-neutral-200'
			);
			h6.style.width = 'unset';
			let hr = document.createElement('hr');
			hr.className = 'dropdown-divider';
			headerLi.appendChild(h6);
			headerLi.appendChild(hr);
			elements.push(headerLi);

			for (let format in DSA[datastructure]) {
				let li = document.createElement('li');
				let a = document.createElement('a');
				a.setAttribute(
					'class',
					'dark block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 dropdown-item'
				);
				a.dataset.teDropdownItemRef = '';
				a.href = '#';
				a.innerText = DSA[datastructure][format].desc;
				a.setAttribute('dsa-type', datastructure);
				a.setAttribute('dsa-option', '');
				a.setAttribute('dsa-format', format);
				li.appendChild(a);
				elements.push(li);
			}
			// elements.push(hr);
		}

		this.Append(elements);
	}

	static Append(elements: HTMLElement[]): void {
		let dropdownMenu = document.querySelector('ul[data-te-dropdown-menu-ref]')!;
		for (let item of elements) dropdownMenu.appendChild(item);
	}
}

export { DatastructureDropdown };
