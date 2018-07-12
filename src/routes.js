import Home 		from './components/Home.vue';
import Navigation  	from './components/Navigation.vue';
import AboutUs 		from './components/AboutUs.vue';

export default  [

    {path: '/home', name: 'home', component: Home},
    {path: '/', redirect: '/home'},      
    {path: '/navigation', name: 'navigation', component: Navigation},
    {path: '/about', name: 'about', component: AboutUs}
];


