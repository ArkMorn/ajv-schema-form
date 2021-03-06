import { defineComponent } from 'vue'
import { CommonWidgetsPropsDefine } from '../type'

import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    margin: '5px 0',
    padding: 0,
    paddingLeft: 20,
  },
})

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetsPropsDefine,
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const { schema } = props
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {/* {errors?.map((err) => (
              <li>{err}</li>
            ))} */}
          </ul>
        </div>
      )
    }
  },
})

export default FormItem
export const withFormItem = (widget: any) => {
  return defineComponent({
    name: `Wrapped${widget.name}`,
    props: CommonWidgetsPropsDefine,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <widget {...props} {...attrs}></widget>
          </FormItem>
        )
      }
    },
  }) as any
}
