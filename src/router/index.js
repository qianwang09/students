import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Evaluation from '@/components/freeevaluation'
import OverseasInstitutions from '@/components/overseasinstitutions'
import SchoolHome from '@/components/public/schoolhome'
import SchoolCountry from '@/components/public/schoolcountry'
import SchoolCountryAll from '@/components/public/schoolcountryall'
import SchoolAll from '@/components/public/schoolall'
import SchoolSearch from '@/components/public/schoolsearch'
import CaseDetail from '@/components/casedetail'
import CaseList from '@/components/caselist'
import SchoolIntroduction from '@/components/schoolintroduction'
import Register from '@/components/register'
import AboutUs from '@/components/aboutus'
import Sign from '@/components/sign'
import Hello from '@/components/hello'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/index',
    name: 'index',
    component: Index,
    alias: '/'
  }, {
    path: '/evaluation',
    name: 'evaluation',
    component: Evaluation
  }, {
    path: '/institution',
    name: 'institution',
    component: OverseasInstitutions,
    children: [{
      path: 'home',
      name: 'schoolhome',
      component: SchoolHome,
      alias: ''
    },{
      path: 'country',
      name: 'schoolcountry',
      component: SchoolCountry
    },  {
      path: 'countryall',
      name: 'schoolcountryall',
      component: SchoolCountryAll
    }, {
      path: 'schoolall',
      name: 'schoolall',
      component: SchoolAll
    },  {
      path: 'search/:searchKey',
      name: 'schoolsearch',
      component: SchoolSearch
    }]
  }, 
  {
      path: '/schoolintroduction',
      name: 'schoolintroduction',
      component: SchoolIntroduction
    },{
    path: '/case/detail',
    name: 'case/detail',
    component: CaseDetail
  }, {
    path: '/case/list',
    name: 'case/list',
    component: CaseList
  },{
    path: '/register',
    name: '/register',
    component: Register
  },{
    path: '/aboutus',
    name: '/aboutus',
    component: AboutUs
  },{
    path: '/sign/:id',
    name: '/sign',
    component: Sign,
    alias: '/sign'
  },{
    path: '/hello',
    name: '/hello',
    component: Hello
  }]
})
