const scroll = () => {
	let element = document.getElementById('arrow');
	let top = window.pageYOffset + element.getBoundingClientRect().top;
	let elementH = element.offsetHeight;
	let scrTop = document.documentElement.scrollTop + (window.innerHeight * 0.8);
	let opacity = 1.0;
	if (scrTop > top) opacity = 1 - (scrTop - top)/5 / elementH;
	if (opacity >= 0.0) element.style.opacity = opacity; else element.style.opacity = 0;
}
window.addEventListener('scroll', scroll);