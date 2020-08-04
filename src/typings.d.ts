type SvgrComponent = React.FC<
  React.SVGAttributes<SVGElement> & {
    title?: string
  }
>

declare module '*.svg' {
  const svgComponent: SvgrComponent
  export default svgComponent
}
