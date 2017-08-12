import Api from '@/api/api'
let api = new Api()
let baseUrl = 'https://test.hh-medic.com/admin-fast/api'
export default {
  setCaseList(params, cb) {
    return api.jsonp(baseUrl + '/list/caseList', params, cb)
  }
}