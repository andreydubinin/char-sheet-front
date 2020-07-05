<template>
  <b-row>
    <b-col>
      <b-table responsive :items="powerList" :fields="fields"></b-table>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      fields   : [
        {
          key  : 'name',
          label: 'Снаряжение'
        },
        {
          key  : 'price',
          label: 'Цена'
        },
        {
          key  : 'weight',
          label: 'Вес'
        },
      ],
      powerList: [
        {
          name  : 'test',
          price : '2',
          weight: '6',
        },
        {
          name  : 'test',
          price : '2',
          weight: '6',
        },
        {
          name  : 'test',
          price : '2',
          weight: '6',
        },
      ]
    }
  }
}
</script>
