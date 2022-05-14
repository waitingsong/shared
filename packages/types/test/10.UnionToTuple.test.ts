import { Equals, UnionToIntersection, EqualsExt } from '../src/index.js'


describe('10.UnionToTuple.test.ts', () => {

  // describe('should UnionToTuple work', () => {
  //   it('normal', () => {
  //     type Foo = { name: 'foo' } | { age: 1}
  //     type T1 = UnionToTuple<Foo>
  //     type ExpectType = [{ age: 1}, { name: 'foo' }]
  //     const ret: Equals<T1, ExpectType> = true
  //   })
  //   it('order not exact', () => {
  //     type Bar = { name: 'foo' } | 1 | 2 | 3
  //     type T2 = UnionToTuple<Bar> // [3, {name: 'foo'}, 2, 1]
  //     type ExpectOrder2 = [3, 2, 1, {name: 'foo'}]
  //     const ret: Equals<T2, ExpectOrder2> = false
  //   })
  // })

  describe('should UnionToIntersection work', () => {
    it('normal', () => {
      type Foo = { name: 'foo' } | { age: number }
      type T1 = UnionToIntersection<Foo>
      type ExpectType = { age: number } & { name: 'foo' }
      type ExpectType2 = { name: 'foo' } & { age: number }
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, ExpectType2> = true
    })
    it('multi value', () => {
      type Foo = { name: 'foo' | 'bar' } | { age: number }
      type T1 = UnionToIntersection<Foo>
      type ExpectType = { age: number } & { name: 'foo' | 'bar' }
      type ExpectType2 = { name: 'bar' | 'foo' } & { age: number }
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, ExpectType2> = true
    })
    it('multi def', () => {
      type Foo = { name: 'foo' } | { name: string }
      type T1 = UnionToIntersection<Foo>
      type ExpectType = { name: string } & { name: 'foo'}
      type ExpectType2 = { name: string | 'foo' } & { name: 'foo'}
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, ExpectType2> = true
    })
    // it('never', () => {
    //   type Foo = { name: 'foo' } | { name: number }
    //   type T1 = UnionToIntersection<Foo>
    //   const ret: Equals<T1, never> = true
    // })
    it('mixed', () => {
      type Foo = {
        uid: {
          tbUserUid: 'tb_user.uid',
          tbUserDetailUid: 'tb_user_detail.uid',
        },
      } | {
        name: {
          tbUserName: 'tb_user.name',
          tbUserDetailName: 'tb_user_detail.name',
        },
      }
      type Expect = {
        uid: {
          tbUserUid: 'tb_user.uid',
          tbUserDetailUid: 'tb_user_detail.uid',
        },
      } & {
        name: {
          tbUserName: 'tb_user.name',
          tbUserDetailName: 'tb_user_detail.name',
        },
      }
      interface Expect2 {
        uid: {
          tbUserUid: 'tb_user.uid',
          tbUserDetailUid: 'tb_user_detail.uid',
        }
        name: {
          tbUserName: 'tb_user.name',
          tbUserDetailName: 'tb_user_detail.name',
        }
      }
      type T1 = UnionToIntersection<Foo>
      const ret: Equals<T1, Expect> = true
      type T2 = UnionToIntersection<Foo>
      const ret2: EqualsExt<T2, Expect2> = true
    })
  })

})

