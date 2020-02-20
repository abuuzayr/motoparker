<template>
  <fragment>
    <div class="top-row">
      <div class="close" @click="closePanel">
        <font-awesome-icon :icon="['fas', 'arrow-left']" size="1x" /> back
      </div>
      <div class="labels">
        <div class="label free" v-if="data.free">free</div>
        <div class="label ura" v-if="data.ura">ura</div>
      </div>
    </div>
    <fragment v-if="data">
      <div v-if="location">
        <h2 v-if="$store.state.edit">
          <input type="text" v-model="data.name" :disabled="saving"/>
        </h2>
        <h2 v-else>
          {{ data.name }}
        </h2>
        <table>
          <tr v-for="(value, key) in filteredData" :key="key">
            <td>
              {{ key === 'ura' ? key.toUpperCase() : capitalize(key) }}
            </td>
            <td v-if="['ura', 'free'].includes(key)">
              <font-awesome-icon :icon="['fas', 'check']" size="1x" :style="{ 'color': 'var(--green)' }" v-if="value"/>
              <font-awesome-icon :icon="['fas', 'times']" size="1x" :style="{ 'color': 'var(--red)' }" v-else/>
            </td>
            <td v-else>
              <fragment v-if="$store.state.edit">
                <textarea v-model="data[key]" :disabled="saving"/>
              </fragment>
              <fragment v-else>
                {{ value }}
              </fragment>
            </td>
          </tr>
          <tr v-if="$store.state.edit">
            <td>URA</td>
            <td>
              <input type="checkbox" v-model="data.ura" :disabled="saving"/>
            </td>
          </tr>
          <tr v-if="$store.state.edit">
            <td>Free</td>
            <td>
              <input type="checkbox" v-model="data.free" :disabled="saving"/>
            </td>
          </tr>
        </table>
        <div class="bottom">
          <span>
            <strong>Last updated on:</strong> 
            {{ date }}
          </span>
          <div v-if="!this.$store.state.edit">
            <a class="edit" @click="edit" v-if="this.$store.state.user">
              <font-awesome-icon :icon="['fas', 'pen']" size="xs" class="icon" />
              edit this location
            </a>
            <a class="edit" @click="login" v-else>
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" size="s" class="icon" />
              sign in to edit
            </a>
          </div>
          <div class="btns" v-else>
            <button class="btn save" @click="save" :disabled="saving">
              Save
            </button>
            <button class="btn cancel" @click="cancel" :disabled="saving">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="info" >
        <h2>
          {{ data.title }}
        </h2>
        <p v-html="data.content">
        </p>
      </div>
    </fragment>
    <div v-else>
      No data
    </div>
  </fragment>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Fragment } from 'vue-fragment'
import Privacy from '../data/privacy.json'
import Terms from '../data/terms.json'

// Icons

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faPen, faCheck, faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faArrowLeft,
  faPen,
  faCheck,
  faTimes,
  faSignInAlt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const dataToShow = [
  'directions',
  'description',
  'charges',
  'free'
]

export default {
  name: 'Panel',
  components: {
    Fragment,
    FontAwesomeIcon
  },
  data() {
    return {
      location: this.$store.state.location,
      info: this.$store.state.info,
      saving: false
    }
  },
  methods: {
    closePanel() {
      this.$emit('closePanel')
    },
    edit() {
      this.$store.dispatch('setEdit', true)
      this.originalData = { ...this.data }
    },
    async save() {
      this.toast = this.$toasted.global.saving()
      if (JSON.stringify(this.originalData) !== JSON.stringify(this.data)) {
        this.saving = true
        try {
          const response = await axios.post(`${process.env.VUE_APP_LOCATION_POST}`, 
            { 
              ...this.data,
              id: this.data._id
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-ZUMO-AUTH': this.$store.state.user.authToken
              }
            }
          )
          if (response.status === 200) {
            this.toast.goAway(0)
            this.$toasted.global.saved()
          } else {
            this.$toasted.global.error({
              message: 'An error has occured, please try again later'
            })
          }
        } catch (e) {
          this.toast.goAway(0)
          this.$toasted.global.error({
            message: `An error has occured: ${e}`
          })
        }
        this.saving = false
      } else {
        this.toast.goAway(0)
        this.$toasted.global.saved()
      }
      this.$store.dispatch('setEdit', false)
    },
    cancel() {
      this.$store.dispatch('setEdit', false)
      this.$store.dispatch('setLocationData', this.originalData)
    },
    login() {
      this.$emit('closePanel')
      this.$modal.show('login')
    },
    capitalize(str) {
      return str.slice(0,1).toUpperCase() + str.slice(1)
    }
  },
  computed: {
    data: function () {
      if (this.info) {
        return this.info === 'privacy' ? Privacy : Terms
      }
      return this.$store.state.locationData
    },
    filteredData: function () {
      const obj = {}
      Object.keys(this.data).map(key => {
        if (dataToShow.includes(key)) {
          obj[key] = this.data[key]
        }
      })
      const sortedObj = {}
      dataToShow.forEach(key => {
        if (key === 'free') return
        if (key === 'charges' && obj['free']) return
        sortedObj[key] = obj[key]
      })
      return sortedObj
    },
    date: function () {
      if (!(this.data && this.data.updatedAt)) return false
      return new Date(this.data.updatedAt).toDateString()
    },
  },
  async mounted() {
    if (this.location) {
      const response = await axios.get(`${process.env.VUE_APP_LOCATION_GET}&id=${this.location}`)
      if (response && response.data.location) {
        this.$store.dispatch('setLocationData', response.data.location)
      }
    }
  }
}
</script>

<style scoped>
h2 {
  line-height: 1.5rem;
  border-bottom: 1px solid var(--gray);
  padding-bottom: 1rem;
  margin-top: 5px;
}
table {
  text-align: left;
  width: calc(100% - 20px);
  margin: 0 10px;
  table-layout: auto;
}

td {
  border-right: 1px solid;
  border-bottom: 1px solid;
  padding: 5px 10px;
}

td:first-child {
  border-left: 1px solid;
  font-weight: bold;
}

tr:first-child td {
  border-top: 1px solid;
}

p {
  text-align: justify;
  padding: 0 20px;
}

.top-row {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.close {
  padding: 10px;
  cursor: pointer;
  font-size: 0.8rem;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  padding-left: 10px;
}

.button svg {
  vertical-align: middle;
}

.edit {
  border: none;
  cursor: pointer;
  display: block;
  margin: 10px;
}

.btn {
  padding: 5px 10px;
  border: 1px solid;
  margin: 5px 5px 5px 0;
  color: #fff;
  cursor: pointer;
}

.btns {
  margin-right: 5px;
}

.save,
.label.free {
  border-color: var(--green);
  background: var(--green);
}

.save:not(:disabled):hover {
  color: var(--green);
  background: #fff;
}

.cancel {
  border-color: var(--red);
  background: var(--red);
}

.cancel:not(:disabled):hover {
  color: var(--red);
  background: #fff;
}

.save:disabled,
.cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.labels {
  margin: 5px 10px;
}

.label {
  display: inline-block;
  padding: 1px 8px;
  border: 1px solid;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  margin-left: 3px;
}

.label.ura {
  border-color: var(--orange);
  background: var(--orange);
}

textarea {
  width: 100%;
  margin: -5px -10px -9px;
  height: 50px;
  font-size: 1rem;
  resize: vertical;
}

input[type="text"] {
  width: calc(100% - 50px);
  margin: 0 10px;
  font-size: 1.5rem;
}

textarea,
input[type="text"] {
  background: var(--light-gray);;
  padding: 10px;
  border: none;
}

</style>