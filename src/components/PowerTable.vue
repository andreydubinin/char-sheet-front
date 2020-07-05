<template>
  <b-row>
    <b-col>
      <b-table responsive :items="powerList" :fields="fields"></b-table>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Сила / Уловка'
        },
        {
          key: 'price',
          label: 'Цена'
        },
        {
          key: 'distance',
          label: 'Дистанция'
        },
        {
          key: 'effect',
          label: 'Урон / Эффект'
        },
        {
          key: 'duration',
          label: 'Длительность'
        },
      ],
      powerList: [
        {
          name: 'test',
          price: '2',
          distance: '6',
          effect: '5',
          duration: '-'
        },
        {
          name: 'test',
          price: '2',
          distance: '6',
          effect: '5',
          duration: '-'
        },
        {
          name: 'test',
          price: '2',
          distance: '6',
          effect: '5',
          duration: '-'
        }
      ]
    }
  }
}
</script>
