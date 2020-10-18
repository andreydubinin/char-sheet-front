<template>
  <div class="characteristic-new-wrap text-lg-right text-center">
    <div class="d-flex">
      <validation-observer ref="observer_new_characteristic" v-slot="{ invalid }">
        <validation-provider
            name="Название характеристики"
            rules="required"
            v-slot="{ validated, invalid, errors }"
            slim
        >
          <b-form-group
              label=""
              :invalid-feedback="errors[0]"
              :state="!validated || !invalid"
          >
            <b-form-input
                v-model="name"
                required
                placeholder="Новая характеристика"
            ></b-form-input>
          </b-form-group>
        </validation-provider>
      </validation-observer>
      <b-button @click="submit">+</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      name: ''
    }
  },
  props  : {
    parentId: {
      type    : Number,
      required: true
    }
  },
  methods: {
    ...mapActions('CharacteristicStore', ['storeForCharsheet', 'fetchCharacteristics']),
    async submit () {
      console.log('submit', this.name);
      const isValid = await this.$refs.observer_new_characteristic.validate();

      if (isValid) {
        const response = await this.storeForCharsheet({
          name     : this.name,
          parent_id: this.parentId
        });

        // по идее надо тупо добавить response в characteristicList, но пока так
        // возможно надо переделать хранение характеристик без использования индексов
        await this.fetchCharacteristics()

        this.name = '';
        this.$refs.observer_new_characteristic.reset();
      }
    }
  }
}
</script>

<style lang="scss">
.characteristic-new-wrap {
  button {
    height: 38px;
  }
}
</style>
