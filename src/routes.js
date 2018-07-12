import Home 		from './components/Home.vue';
import Navigation  	from './components/Navigation.vue';
import AboutUs 		from './components/AboutUs.vue';
import InfoVue 		from './components/InfoVue.vue';
import Fases from './components/Fases.vue';

export default  [

    {path: '/home', name: 'home', component: Home},
    {path: '/', redirect: '/home'},      
    {path: '/navigation', name: 'navigation', component: Navigation},
    {path: '/about', name: 'about', component: AboutUs},    
    {path: '/fases', name:'fases', component: Fases},    
    {path: '/infovue', component: InfoVue}     
];


