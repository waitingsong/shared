
export const expectedDict = {
  aliasColumns: {
    tb_user: {
      tbUserUid: 'tb_user.uid',
      tbUserName: 'tb_user.name',
      tbUserCtime: 'tb_user.ctime',
    },
    tb_user_ext: {
      tbUserExtUid: 'tb_user_ext.uid',
      tbUserExtAge: 'tb_user_ext.age',
      tbUserExtAddress: 'tb_user_ext.address',
    },
  },
  scopedColumns: {
    tb_user: {
      uid: 'tb_user.uid',
      name: 'tb_user.name',
      ctime: 'tb_user.ctime',
    },
    tb_user_ext: {
      uid: 'tb_user_ext.uid',
      age: 'tb_user_ext.age',
      address: 'tb_user_ext.address',
    },
  },
}

export const expectedDict2 = {
  aliasColumns: {
    tb_user: {
      tbUserUid: 'tb_user.uid',
      tbUserName: 'tb_user.name',
      tbUserCtime: 'tb_user.ctime',
    },
    tb_user_ext: {
      tbUserExtUid: 'tb_user_ext.uid',
      tbUserExtAge: 'tb_user_ext.age',
      tbUserExtAddress: 'tb_user_ext.address',
    },
    tb_order: {
      tbOrderOrderId: 'tb_order.order_id',
      tbOrderOrderName: 'tb_order.order_name',
    },
  },
  scopedColumns: {
    tb_user: {
      uid: 'tb_user.uid',
      name: 'tb_user.name',
      ctime: 'tb_user.ctime',
    },
    tb_user_ext: {
      uid: 'tb_user_ext.uid',
      age: 'tb_user_ext.age',
      address: 'tb_user_ext.address',
    },
    tb_order: {
      order_id: 'tb_order.order_id',
      order_name: 'tb_order.order_name',
    },
  },
}

