// 'use client'
//
// import type { NextPage } from 'next';
// import tw from 'twin.macro'
// import styled from 'styled-components'
//
// type Props = {
//   children: React.ReactNode
// }
//
// // const ContainerDiv = tw.div`
// //   max-w-[2520px]
// //   mx-auto
// //   xl:px-20
// //   md:pd-10
// //   sm:px-2
// //   px-4
// // `
// //
//
// const StyledForm = styled.main.attrs({
//   className: 'flex flex-col h-screen justify-center items-center bg-gray-100',
// })`
//   & {
//     form {
//       ${tw`bg-white text-center rounded py-8 px-5 shadow max-w-xs`}
//     }
//     input {
//       ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
//     }
//     button {
//       ${tw`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
//     }
//   }
// `
// export const Main = tw.main`
//   flex
//   w-full
//   flex-1
//   flex-col
//   items-center
//   justify-center
//   px-20
//   text-center
// `
//
// export default function Container({ children }: Props)"" {
//   return (
//     <Main>
//       <StyledForm />
//       {children}
//     </Main>
//   )
// }
import type { NextPage } from 'next';
import tw from 'twin.macro';

export const Container = tw.div`
  flex
  min-h-screen
  flex-col
  items-center
  justify-center
  py-2
`;

export const Title = tw.h1`
  text-6xl
  font-bold
`;

const AboutPage: NextPage = () => {
  return (
    <Container>
      <Title>This is the about page </Title>
    </Container>
  );
};

export default AboutPage;
