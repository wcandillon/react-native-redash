import React from "react"
import styled from "styled-components"

import Button from "./components/Button"
import Container from "./components/Container"
import SafeAreaView from "./components/SafeAreaView"

const Device = styled.div`
  position: relative;
  display: flex;
  width: 180px;
  height: 390px;
  background-color: #c3e8e7;
  background-image: linear-gradient(60deg, #c3d9e8 1%, #c3e8e7 100%);
  border-radius: 20px;
  box-shadow: 0px 0px 0px 5.5px #1f1f1f, 0px 0px 0px 6.5px #191919,
    0px 0px 0px 10px #111;
  overflow: hidden;
`

const TopFrame = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
  width: 56%;
  height: 15px;
  background-color: #1f1f1f;
  border-radius: 0px 0px 20px 20px;
`

const Speaker = styled.div`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 3px);
  height: 4px;
  width: 15%;
  background-color: #101010;
  border-radius: 4px;
  box-shadow: inset 0px -1.5px 1.5px 0px rgba(256, 256, 256, 0.2);
`

const HomeButtonIndicator = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3.5px;
  width: 70px;
  height: 2px;
  background-color: #1f1f1f;
  border-radius: 5px;
`

type StaticProps = {
  Button: typeof Button
  Container: typeof Container
  SafeAreaView: typeof SafeAreaView
}

const IPhone: React.FC & StaticProps = ({ children }) => (
  <Device>
    <TopFrame />
    <Speaker />

    {children}

    <HomeButtonIndicator />
  </Device>
)

IPhone.Button = Button
IPhone.Container = Container
IPhone.SafeAreaView = SafeAreaView

export default IPhone
