<template>
  <div>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
body {
  background-color:#FFE4B5;
}
#img-logo {
  overflow: hidden;
  height: 200px;
}
.card {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 0px 15px grey;
  background-color:white;
}
.card__title {
  text-align: center;
  margin-bottom: 5px;
  margin-top: 0;
  font-size: 30px;
}
.card__subtitle {
  margin: 0;
  font-size: 12px;
  text-align: center;
}
.card__action {
  font-weight: bold;
  color: royalblue;
  cursor: pointer;
}
.form-row {
  display: flex;
  justify-content: center;
  margin: 8px;
  flex-wrap: wrap;
}
.button {
  border-radius: 20px;
  width: 210px;
  height: 34px;
  background-color: #F4A460;
  color: white;
  font-weight: bold;
  font-size: 20px;
}
.button:hover {
  box-shadow: 0px 0px 10px #708090;
}
.deleteButton {
    margin-right: 10px;
    font-size: 11px;
    cursor: pointer;
    &:hover {
        font-size: 13px;
        color: blue;
        font-weight: bold;
    }
}
textarea {
  background: whitesmoke;
}
</style>
