import { defineComponent, DefineComponent } from 'vue'

import { FiledPropsDefine, CommonFieldType } from '../type'
import { isObject } from '../utils'
import { SchemaFormContextKey, useVJSFContext } from '../context'

// import SchemaItem from '../SchemaItem'

// console.log(SchemaItem)

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
}

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}

      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }

      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value, uiSchema } = props

      const { SchemaFormItem } = context

      const properties = schema.properties || {}

      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaFormItem
          schema={properties[k]}
          rootSchema={rootSchema}
          uiSchema={uiSchema.properties ? uiSchema.properties[k] || {} : {}}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        />
      ))
    }
  },
})
