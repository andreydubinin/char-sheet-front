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
          label: 'Оружие'
        },
        {
          key  : 'distance',
          label: 'Дистанция'
        },
        {
          key  : 'speed',
          label: 'Ск.'
        },
        {
          key  : 'damage',
          label: 'Урон'
        },
      ],
      powerList: [
        {
          name    : 'test',
          distance: '6',
          speed   : '5',
          damage  : '4'
        },
        {
          name    : 'test',
          distance: '6',
          speed   : '5',
          damage  : '4'
        },
        {
          name    : 'test',
          distance: '6',
          speed   : '5',
          damage  : '4'
        },
      ]
    }
  }
}
</script>
