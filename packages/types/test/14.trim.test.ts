import assert from 'assert/strict'

import {
  Equals,
  Trim,
  TrimStart,
  TrimEnd,
} from '../src/index'


describe('13.trim.test.ts', () => {

  describe('should TrimStart work', () => {
    it('1', () => {
      type Foo = 'tb_user'
      type T1 = TrimStart<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
    })

    it('2', () => {
      type Foo = ' tb_user'
      type T1 = TrimStart<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('3', () => {
      type Foo = ' tb_user '
      type T1 = TrimStart<Foo>
      type ExpectType = 'tb_user '
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('4', () => {
      type Foo = 'tb_user '
      type T1 = TrimStart<Foo>
      type ExpectType = 'tb_user '
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('5', () => {
      type Foo = '             tb_user'
      type T1 = TrimStart<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })
  })

  describe('should TrimEnd work', () => {
    it('1', () => {
      type Foo = 'tb_user'
      type T1 = TrimEnd<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, 'tb_user '> = false
    })

    it('2', () => {
      type Foo = 'tb_user '
      type T1 = TrimEnd<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('3', () => {
      type Foo = ' tb_user '
      type T1 = TrimEnd<Foo>
      type ExpectType = ' tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('4', () => {
      type Foo = 'tb_user '
      type T1 = TrimEnd<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('5', () => {
      type Foo = 'tb_user                   '
      type T1 = TrimEnd<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })
  })


  describe('should Trim work', () => {
    it('normal', () => {
      type Foo = 'tb_user'
      type T1 = Trim<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('two', () => {
      type Foo = ' tb_user '
      type T1 = Trim<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ne: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('three', () => {
      type Foo = '   tb_user    '
      type T1 = Trim<Foo>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ne: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })
  })

})

