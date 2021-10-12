import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  kpiBiggestTrader: any,
  loadingKpiBiggestTrader: boolean,
  kpiTotalTransaction: any,
  loadingKpiTotalTransaction: boolean,
  kpiTotalUniqueUser: any,
  loadingKpiTotalUniqueUser: boolean,
  kpiTotalVolume: any,
  loadingKpiTotalVolume: boolean,
  topTraderMoc: any,
  loadingTopTrader: boolean,
  totalVolumeByDate: any,
  loadingTotalVolumeByDate: boolean,
  totalUniqueUserByDate: any,
  loadingTotalUniqueUserByDate: boolean,
  totalNewUserByDate: any,
  loadingTotalNewUserByDate: boolean,
  top10TraderByTransactions: any,
  loadingTop10TraderByAddress: boolean,
  collectedFee: any,
  loadingCollectedFee: boolean,
  collectedFeeByDate: any,
  loadingCollectedFeeByDate: boolean,
  listHistory: any,
  loadingListHistory: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    listHistory: [],
    loadingListHistory: false,
    kpiBiggestTrader: {},
    loadingKpiBiggestTrader: false,
    kpiTotalTransaction: {},
    loadingKpiTotalTransaction: false,
    kpiTotalUniqueUser: {},
    loadingKpiTotalUniqueUser: false,
    kpiTotalVolume: {},
    loadingKpiTotalVolume: false,
    topTraderMoc: [],
    loadingTopTrader: false,
    totalVolumeByDate: [],
    loadingTotalVolumeByDate: false,
    totalUniqueUserByDate: [],
    loadingTotalUniqueUserByDate: false,
    totalNewUserByDate: [],
    loadingTotalNewUserByDate: false,
    top10TraderByTransactions : [],
    loadingTop10TraderByAddress: false,
    collectedFee: {},
    loadingCollectedFee: false,
    collectedFeeByDate: [],
    loadingCollectedFeeByDate: false
  },
  mutations: {
    setSearchHistory(state, data){
      state.listHistory = data
    },
    setLoadingSearchHistory(state, data){
      state.loadingListHistory = data
    },
    setCollectedFeeByDate(state, data){
      state.collectedFeeByDate = data
    },
    setLoadingCollectedFeeByDate(state, data){
      state.loadingCollectedFeeByDate  = data
    },
    setCollectedFee(state, data){
      state.collectedFee = data
    },
    setLoadingCollectedFee(state, data){
      state.loadingCollectedFee = data
    },
    setLoadingBiggestTrader(state, data) {
      state.loadingKpiBiggestTrader = data
    },
    setBiggestTrade(state, data){
      state.kpiBiggestTrader = data
    },
    setKpiTotalVolume(state, data){
      state.kpiTotalVolume = data
    },
    setLoadingKpiTotalVolume(state, data){
      state.loadingKpiTotalVolume = data
    },
    setKpiTotalUniqueUser(state, data){
      state.kpiTotalUniqueUser = data
    },
    setLoadingKpiTotalUniqueUser(state, data){
      state.loadingKpiTotalUniqueUser = data
    },
    setKpiTotalTransactrions(state, data){
      state.kpiTotalTransaction = data
    },
    setLoadingKpiTotalTransaction(state,data){
      state.loadingKpiTotalTransaction = data
    },
    setTop10TraderMoc(state, data){
      state.topTraderMoc = data
    },
    setLoadingTopTrader(state, data){
      state.loadingTopTrader = data
    },
    setDataTotalVolumeByDate(state, data){
      state.totalVolumeByDate = data
    },
    setLoadingTotalVolumeByDate(state, data){
      state.loadingTotalVolumeByDate = data
    },
    setTotalUniqueUserByDate(state, data){
      state.totalUniqueUserByDate = data
    },
    setLoadingTotalUniqueUserByDate(state, data){
      state.loadingTotalUniqueUserByDate = data
    },
    setTotalNewUserByDate(state, data){
      state.totalNewUserByDate = data
    },
    setLoadingTotalNewUserByDate(state, data){
      state.loadingTotalNewUserByDate = data
    },
    setTopTraderByTransaction(state, data){
      state.top10TraderByTransactions = data
    },
    setLoadingTop10TraderByTransaction(state, data){
      state.loadingTop10TraderByAddress = data
    }
  },
  actions: {
    async getDataKpiBiggestTrader({commit}, database_name) {
      store.commit('setLoadingBiggestTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_biggest_trade?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setBiggestTrade', await response.json())})
      .catch((error) => {
        commit('setBiggestTrade', error)
      }).finally(() => {
        store.commit('setLoadingBiggestTrader', false)
      })
    },
    async getKpiTotalTradeVolume({commit}, database_name) {
      store.commit('setLoadingKpiTotalVolume', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setKpiTotalVolume', await response.json())})
      .catch((error) => {
        commit('setKpiTotalVolume', error)
      }).finally(() => {
        store.commit('setLoadingKpiTotalVolume', false)
      })
    },
    async getKpiTotalUniqueUser({commit}, database_name) {
      store.commit('setLoadingKpiTotalUniqueUser', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setKpiTotalUniqueUser', await response.json())})
      .catch((error) => {
        commit('setKpiTotalUniqueUser', error)
      }).finally(() => {
        store.commit('setLoadingKpiTotalUniqueUser', false)
      })
    },
    async getKpiTotalTransactions({commit}, database_name) {
      store.commit('setLoadingKpiTotalTransaction', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_transaction?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setKpiTotalTransactrions', await response.json())})
      .catch((error) => {
        commit('setKpiTotalTransactrions', error)
      }).finally(() => {
        store.commit('setLoadingKpiTotalTransaction', false)
      })
    },
    async getTop10TraderMoc({commit}) {
      store.commit('setLoadingTopTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_top_10_trader_moc`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTop10TraderMoc', await response.json())})
      .catch((error) => {
        commit('setTop10TraderMoc', error)
      }).finally(() => {
        store.commit('setLoadingTopTrader', false)
      })
    },
    async getTotalVolumeByDate({commit}) {
      store.commit('setLoadingTotalVolumeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_volume_by_date_moc`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setDataTotalVolumeByDate', await response.json())})
      .catch((error) => {
        commit('setDataTotalVolumeByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalVolumeByDate', false)
      })
    },
    async getTotalUniqueUserByDate({commit}) {
      store.commit('setLoadingTotalUniqueUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user_by_date_moc`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalUniqueUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalUniqueUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalUniqueUserByDate', false)
      })
    },
    async getTotalNewUserByDate({commit}) {
      store.commit('setLoadingTotalNewUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_new_user_by_date_moc`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalNewUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalNewUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalNewUserByDate', false)
      })
    },
    async getTop10TraderRif({commit}) {
      store.commit('setLoadingTopTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_top_10_trader_rif`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTop10TraderMoc', await response.json())})
      .catch((error) => {
        commit('setTop10TraderMoc', error)
      }).finally(() => {
        store.commit('setLoadingTopTrader', false)
      })
    },
    async getTotalVolumeByDateRif({commit}) {
      store.commit('setLoadingTotalVolumeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_volume_trade_by_date_rif`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setDataTotalVolumeByDate', await response.json())})
      .catch((error) => {
        commit('setDataTotalVolumeByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalVolumeByDate', false)
      })
    },
    async getTotalUniqueUserByDateRif({commit}) {
      store.commit('setLoadingTotalUniqueUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user_by_date_rif`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalUniqueUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalUniqueUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalUniqueUserByDate', false)
      })
    },
    async getTotalNewUserByDateRif({commit}) {
      store.commit('setLoadingTotalNewUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_new_user_by_date_rif`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalNewUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalNewUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalNewUserByDate', false)
      })
    },
    async getTop10TraderByTransaction({commit}, database_name) {
      store.commit('setLoadingTopTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_top_10_trader_by_address?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTop10TraderMoc', await response.json())})
      .catch((error) => {
        commit('setTop10TraderMoc', error)
      }).finally(() => {
        store.commit('setLoadingTopTrader', false)
      })
    },
    async getTotalVolumeMonthly({commit}, database_name) {
      store.commit('setLoadingTotalVolumeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade_volume_monthly?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setDataTotalVolumeByDate', await response.json())})
      .catch((error) => {
        commit('setDataTotalVolumeByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalVolumeByDate', false)
      })
    },
    async getTotalUniqueUserByMonth({commit}, database_name) {
      store.commit('setLoadingTotalUniqueUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user_monthly?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalUniqueUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalUniqueUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalUniqueUserByDate', false)
      })
    },
    async getTotalNewuserMonthly({commit}, database_name) {
      store.commit('setLoadingTotalNewUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_new_user_monthly?database_name=${database_name}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalNewUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalNewUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalNewUserByDate', false)
      })
    },
    async getKpiBiggestTradeRsk({commit}) {
      store.commit('setLoadingBiggestTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_best_trader_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setBiggestTrade', await response.json())})
      .catch((error) => {
        commit('setBiggestTrade', error)
      }).finally(() => {
        store.commit('setLoadingBiggestTrader', false)
      })
    },
    async getTotalTradeVolumeRsk({commit}) {
      store.commit('setLoadingKpiTotalVolume', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade_volume_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setKpiTotalVolume', await response.json())})
      .catch((error) => {
        commit('setKpiTotalVolume', error)
      }).finally(() => {
        store.commit('setLoadingKpiTotalVolume', false)
      })
    },
    async getTotalUniqueUserRsk({commit}) {
      store.commit('setLoadingKpiTotalUniqueUser', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setKpiTotalUniqueUser', await response.json())})
      .catch((error) => {
        commit('setKpiTotalUniqueUser', error)
      }).finally(() => {
        store.commit('setLoadingKpiTotalUniqueUser', false)
      })
    },
    async getTotalCollectedFeeRsk({commit}) {
      store.commit('setLoadingCollectedFee', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_collected_fee_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setCollectedFee', await response.json())})
      .catch((error) => {
        commit('setCollectedFee', error)
      }).finally(() => {
        store.commit('setLoadingCollectedFee', false)
      })
    },
    async getTopTraderRsk({commit}) {
      store.commit('setLoadingTopTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_top_10_address_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTop10TraderMoc', await response.json())})
      .catch((error) => {
        commit('setTop10TraderMoc', error)
      }).finally(() => {
        store.commit('setLoadingTopTrader', false)
      })
    },
    async getTotalTradeVolumeByDateRsk({commit}) {
      store.commit('setLoadingTotalVolumeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade_by_date_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setDataTotalVolumeByDate', await response.json())})
      .catch((error) => {
        commit('setDataTotalVolumeByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalVolumeByDate', false)
      })
    },
    async getTotalTradeVolumeByMonthRsk({commit}) {
      store.commit('setLoadingTotalVolumeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade_by_month_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setDataTotalVolumeByDate', await response.json())})
      .catch((error) => {
        commit('setDataTotalVolumeByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalVolumeByDate', false)
      })
    },
    async getCollectedFeeByDateRsk({commit}) {
      store.commit('setLoadingCollectedFeeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_collected_fee_by_date_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setCollectedFeeByDate', await response.json())})
      .catch((error) => {
        commit('setCollectedFeeByDate', error)
      }).finally(() => {
        store.commit('setLoadingCollectedFeeByDate', false)
      })
    },
    async getCollectedFeeByMonthRsk({commit}) {
      store.commit('setLoadingCollectedFeeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_collected_fee_by_month_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setCollectedFeeByDate', await response.json())})
      .catch((error) => {
        commit('setCollectedFeeByDate', error)
      }).finally(() => {
        store.commit('setLoadingCollectedFeeByDate', false)
      })
    },
    async getTotalUniqueUserByDateRsk({commit}) {
      store.commit('setLoadingTotalUniqueUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user_by_date_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalUniqueUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalUniqueUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalUniqueUserByDate', false)
      })
    },
    async getTotalUniqueUserByMonthRsk({commit}) {
      store.commit('setLoadingTotalUniqueUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user_by_month_rsk`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalUniqueUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalUniqueUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalUniqueUserByDate', false)
      })
    },
    async bestTradeSovBridge({commit}) {
      store.commit('setLoadingBiggestTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_best_trade_sov`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setBiggestTrade', await response.json())})
      .catch((error) => {
        commit('setBiggestTrade', error)
      }).finally(() => {
        store.commit('setLoadingBiggestTrader', false)
      })
    },
    async getTotalTradeVolumeSov({commit}) {
      store.commit('setLoadingKpiTotalVolume', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade_sovryn`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setKpiTotalVolume', await response.json())})
      .catch((error) => {
        commit('setKpiTotalVolume', error)
      }).finally(() => {
        store.commit('setLoadingKpiTotalVolume', false)
      })
    },
    async getTotalUniqueAddressSov({commit}) {
      store.commit('setLoadingKpiTotalUniqueUser', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_user_sovryn`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setKpiTotalUniqueUser', await response.json())})
      .catch((error) => {
        commit('setKpiTotalUniqueUser', error)
      }).finally(() => {
        store.commit('setLoadingKpiTotalUniqueUser', false)
      })
    },
    async getTotalCollectedFeeSovryn({commit}) {
      store.commit('setLoadingCollectedFee', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_fee_sovryn`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setCollectedFee', await response.json())})
      .catch((error) => {
        commit('setCollectedFee', error)
      }).finally(() => {
        store.commit('setLoadingCollectedFee', false)
      })
    },
    async getTopTraderSov({commit}) {
      store.commit('setLoadingTopTrader', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_top_trader_sov`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTop10TraderMoc', await response.json())})
      .catch((error) => {
        commit('setTop10TraderMoc', error)
      }).finally(() => {
        store.commit('setLoadingTopTrader', false)
      })
    },
    async getTotalTradeVolumeByDateSov({commit}) {
      store.commit('setLoadingTotalVolumeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade_by_date_sov`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setDataTotalVolumeByDate', await response.json())})
      .catch((error) => {
        commit('setDataTotalVolumeByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalVolumeByDate', false)
      })
    },
    async getTotalTradeVolumeSovMonth({commit}) {
      store.commit('setLoadingTotalVolumeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_trade_by_month_sov`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setDataTotalVolumeByDate', await response.json())})
      .catch((error) => {
        commit('setDataTotalVolumeByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalVolumeByDate', false)
      })
    },
    async getColectedFeeByDateSov({commit}) {
      store.commit('setLoadingCollectedFeeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_collected_fee_sov_date`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setCollectedFeeByDate', await response.json())})
      .catch((error) => {
        commit('setCollectedFeeByDate', error)
      }).finally(() => {
        store.commit('setLoadingCollectedFeeByDate', false)
      })
    },
    async getCollectedFeeMonthSov({commit}) {
      store.commit('setLoadingCollectedFeeByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_collected_fee_sov_month`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setCollectedFeeByDate', await response.json())})
      .catch((error) => {
        commit('setCollectedFeeByDate', error)
      }).finally(() => {
        store.commit('setLoadingCollectedFeeByDate', false)
      })
    },
    async getTotalUniqueAddressByDateSov({commit}) {
      store.commit('setLoadingTotalUniqueUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_address_by_date_sov`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalUniqueUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalUniqueUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalUniqueUserByDate', false)
      })
    },
    async getTotalUniqueAddressByMonthSov({commit}) {
      store.commit('setLoadingTotalUniqueUserByDate', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}get_total_unique_address_by_month_sov`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setTotalUniqueUserByDate', await response.json())})
      .catch((error) => {
        commit('setTotalUniqueUserByDate', error)
      }).finally(() => {
        store.commit('setLoadingTotalUniqueUserByDate', false)
      })
    },
    async searchAddressMoc({commit}, address) {
      store.commit('setLoadingSearchHistory', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}search_address_moc?address=${address}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setSearchHistory', await response.json())})
      .catch((error) => {
        commit('setSearchHistory', error)
      }).finally(() => {
        store.commit('setLoadingSearchHistory', false)
      })
    },
    async searchAddressRif({commit}, address) {
      store.commit('setLoadingSearchHistory', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}search_address_rif?address=${address}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setSearchHistory', await response.json())})
      .catch((error) => {
        commit('setSearchHistory', error)
      }).finally(() => {
        store.commit('setLoadingSearchHistory', false)
      })
    },
    async serchAddressRsk({commit}, address) {
      store.commit('setLoadingSearchHistory', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}search_address_rsk?address=${address}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setSearchHistory', await response.json())})
      .catch((error) => {
        commit('setSearchHistory', error)
      }).finally(() => {
        store.commit('setLoadingSearchHistory', false)
      })
    },
    async serchAddressSov({commit}, address) {
      store.commit('setLoadingSearchHistory', true)
      await fetch(`${process.env.VUE_APP_BASE_URL}search_address_sov?address=${address}`, {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      }).then(async (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        commit('setSearchHistory', await response.json())})
      .catch((error) => {
        commit('setSearchHistory', error)
      }).finally(() => {
        store.commit('setLoadingSearchHistory', false)
      })
    },
  },
})
//  search_address_rif
// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}