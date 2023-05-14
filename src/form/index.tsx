import {
  Children,
  useCallback,
  useRef,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  ReactNode,
  ReactElement,
  Ref,
  cloneElement,
} from 'react';
import {View} from 'react-native';

import {styles} from './styles';
import {FormHandler, FormProps, Errors} from './types';

export * from './types';

const FormCompoent = <T extends object>(
  {children, style, onSubmit = () => {}, initValues}: FormProps<T>,
  formRef: Ref<FormHandler>,
) => {
  const nodes = useRef(new Map()).current;

  const submit = useCallback(() => {
    let data: Partial<T> = {};
    let errors: Errors<T> = {};
    const keys = [...nodes.keys()];
    keys.forEach((key: keyof T) => {
      const node = nodes.get(key);
      if (node) {
        const {ref, props} = node;
        const {required = false} = props;
        data[key] = ref.value;
        if (required && !ref.value) {
          errors[key] = `${String(key)} is required`;
        }
      }
    });
    const getErrors = Object.keys(errors).length > 0;
    onSubmit({
      data: getErrors ? null : (data as T),
      errors: getErrors ? errors : null,
    });
  }, [onSubmit, nodes]);

  const renderChild = useCallback((child: ReactNode): ReactNode => {
    if (isValidElement(child)) {
      if (child.props.name) {
        const key = child.props.name;
        let initValue;
        if (initValues) {
          const value = initValues[key as keyof T];
          if (value) {
            initValue = value;
          }
        }
        child.props = {
          ...child.props,
          initValue,
        };
        return cloneElement(child, {
          ...child.props,
          initValue,
          //@ts-ignore
          ref: childRef => {
            //@ts-ignore
            nodes.set(key, {ref: childRef, props: child.props});
            //@ts-ignore
            if (child.ref && typeof child.ref === 'function') {
              //@ts-ignore
              child.ref(childRef);
            }
            //@ts-ignore
            if (child.ref && typeof child.ref === 'object') {
              //@ts-ignore
              child.ref.current = childRef;
            }
          },
        });
      }
      if (child.props.type && child.props.type === 'submit') {
        child.props = {
          ...child.props,
          onPress: submit,
        };
      }
      if (child.props.children) {
        let nextChilds;
        if (Children.count(child.props.children) > 1) {
          nextChilds = Children.map(child.props.children, nextChild =>
            renderChild(nextChild),
          );
        }
        if (Children.count(child.props.children) === 1) {
          nextChilds = renderChild(child.props.children);
        }
        child.props.children = nextChilds;
      }
    }
    return child;
  }, [onSubmit, initValues]);

  useImperativeHandle(
    formRef,
    () => ({
      submit,
    }),
    [submit],
  );

  return (
    <View style={[styles.container, style]}>
      {Children.map(children, child => renderChild(child))}
    </View>
  );
};

export const Form = forwardRef(FormCompoent) as <T extends object>(
  props: FormProps<T> & {ref?: Ref<FormHandler>},
) => ReactElement;
