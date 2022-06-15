const withDefault = <Comp, DP>(
  component: React.ComponentType<Comp>,
  props: DP,
) => {
  component.defaultProps = props
  type Props = Partial<DP> & Omit<Comp, keyof DP>
  return component as React.ComponentType<Props>
}

export default withDefault
