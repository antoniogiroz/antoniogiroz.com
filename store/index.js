export const state = () => ({
  currentTheme: 'theme-light'
})

export const mutations = {
  changeTheme(state, theme) {
    state.currentTheme = theme
    localStorage.setItem('theme', theme)
  }
}
