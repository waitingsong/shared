import { fileShortPath } from '@waiting/shared-core'

import {
  Equals,
  Trim,
  TrimStart,
  TrimEnd,
} from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should TrimStart work w/o delimiter', () => {
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

  describe('should TrimStart work with delimiter space', () => {
    it('1', () => {
      type Foo = 'tb_user'
      type T1 = TrimStart<Foo, ' '>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
    })

    it('2', () => {
      type Foo = ' tb_user'
      type T1 = TrimStart<Foo, ' '>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('3', () => {
      type Foo = ' tb_user '
      type T1 = TrimStart<Foo, ' '>
      type ExpectType = 'tb_user '
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('4', () => {
      type Foo = 'tb_user '
      type T1 = TrimStart<Foo, ' '>
      type ExpectType = 'tb_user '
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('5', () => {
      type Foo = '             tb_user'
      type T1 = TrimStart<Foo, ' '>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })
  })

  describe('should TrimStart work with delimiter _', () => {
    it('1', () => {
      type Foo = 'tb_user'
      type T1 = TrimStart<Foo, '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '__tb_user'> = false
    })

    it('2', () => {
      type Foo = '_tb_user'
      type T1 = TrimStart<Foo, '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user_'> = false
    })

    it('3', () => {
      type Foo = '_tb_user_'
      type T1 = TrimStart<Foo, '_'>
      type ExpectType = 'tb_user_'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user__'> = false
    })

    it('4', () => {
      type Foo = 'tb_user_'
      type T1 = TrimStart<Foo, '_'>
      type ExpectType = 'tb_user_'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user__'> = false
    })

    it('5', () => {
      type Foo = '_________tb_user'
      type T1 = TrimStart<Foo, '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })
  })

  describe('should TrimStart work with delimiter space|_', () => {
    it('1', () => {
      type Foo = 'tb_user'
      type T1 = TrimStart<Foo, ' ' | '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
    })

    it('2', () => {
      type Foo = ' _tb_user'
      type T1 = TrimStart<Foo, ' ' | '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('3', () => {
      type Foo = '_ tb_user '
      type T1 = TrimStart<Foo, ' ' | '_'>
      type ExpectType = 'tb_user '
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('4', () => {
      type Foo = 'tb_user_ '
      type T1 = TrimStart<Foo, ' ' | '_'>
      type ExpectType = 'tb_user_ '
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user  '> = false
    })

    it('5', () => {
      type Foo = '  __           tb_user'
      type T1 = TrimStart<Foo, ' ' | '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })
  })


  describe('should TrimEnd work w/o delimiter', () => {
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

  describe('should TrimEnd work with delimiter _', () => {
    it('1', () => {
      type Foo = 'tb_user'
      type T1 = TrimEnd<Foo, '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, 'tb_user '> = false
    })

    it('2', () => {
      type Foo = 'tb_user_'
      type T1 = TrimEnd<Foo, '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user_'> = false
    })

    it('3', () => {
      type Foo = '_tb_user_'
      type T1 = TrimEnd<Foo, '_'>
      type ExpectType = '_tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user__'> = false
    })

    it('4', () => {
      type Foo = 'tb_user_'
      type T1 = TrimEnd<Foo, '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user__'> = false
    })

    it('5', () => {
      type Foo = 'tb_user________'
      type T1 = TrimEnd<Foo, '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
      const ret3: Equals<T1, '__tb_user'> = false
      const ret4: Equals<T1, 'tb_user_'> = false
    })
  })


  describe('should Trim work w/o delimiter', () => {
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

  describe('should Trim work with delimiter space|_', () => {
    it('1', () => {
      type Foo = 'tb_user'
      type T1 = Trim<Foo, ' ' | '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = true
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('2', () => {
      type Foo = ' __tb_user__ '
      type T1 = Trim<Foo, ' ' | '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ne: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })

    it('3', () => {
      type Foo = '______   tb_user    '
      type T1 = Trim<Foo, ' ' | '_'>
      type ExpectType = 'tb_user'
      const ret: Equals<T1, ExpectType> = true
      const ne: Equals<T1, Foo> = false
      const ret3: Equals<T1, '  tb_user'> = false
      const ret4: Equals<T1, 'tb_user '> = false
    })
  })

})

