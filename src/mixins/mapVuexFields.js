/**
 * Генерация two-way computed properties между компонентом и vuex
 *
 * Для корректной работы необходимо следующее наименование:
 * 		- название поля: 'field'
 * 		- название в getters: 'field'
 * 		- название в mutations: 'set_field'
 *
 */

import {mapGetters, mapMutations} from "vuex";

const createGettersObject = fields => {
  let getters = {};

  fields.forEach(field => getters[`get_${field}`] = field);

  return getters;
};

const createMutationsObject = fields => {
  return fields.map(field => `set_${field}`);
};

const createComputedProps = fields => {
  let computed = {};

  fields.forEach(field => {
    computed[field] = {
      get() {
        return this[`get_${field}`];
      },
      set(value) {
        return this[`set_${field}`](value);
      }
    }
  });

  return computed;
};

export default (namespace = '', fields = []) => {
  return {
    computed: {
      ...mapGetters(
          namespace,
          createGettersObject(fields)
      ),
      ...createComputedProps(fields),
    },
    methods: {
      ...mapMutations(
          namespace,
          createMutationsObject(fields)
      ),
    }
  }
}
