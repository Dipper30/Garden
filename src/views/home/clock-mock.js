import moment from 'moment'

export const clocks = {
  future: [
    {
      set_time: moment().year(2021).month(11).day(25).unix(),
      title: '圣诞节',
      desc: ''
    },
    {
      set_time: moment().month(9).day(31).unix(),
      title: '生日',
      desc: ''
    },
    {
      set_time: 1630528632 + 250000,
      title: '又是一天',
      desc: '啊哦，这是描述'
    },
    {
      set_time: moment().unix(),
      title: '今天',
      desc: ''
    },
    {
      set_time: 1630600000 + 1000000,
      title: '不知名的一天',
      desc: ''
    },
    {
      set_time: 1630528632 + 250000,
      title: '又是一天',
      desc: '啊哦，这是描述'
    }
  ],
  past: [
    {
      set_time: 1630528632 - 25000,
      title: '这是过去',
      desc: '啊哦，这是描述'
    },
    {
      set_time: 1630528632 - 200000,
      title: '过去2',
      desc: '啊哦，这是描述'
    }
  ]
}
