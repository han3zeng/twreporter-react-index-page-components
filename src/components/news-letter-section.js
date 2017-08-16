import React from 'react'
import EmailIcon from '../static/subscribe-icon.svg'
import delay from 'lodash/delay'
import styled from 'styled-components'

const _ = {
  delay,
}

const mailChimpURL = '//twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=754d51d1e3'
const bgColor = '#f2f2f2'

const Container = styled.div`
  background-color: ${bgColor};
  padding-top: 70px;
  padding-bottom: 70px;
`

const ContentContainer = styled.div`
  max-width: 610px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
`

const Icon = styled.div`
  > svg {
    width: 60px;
    height: 40px;
  }

  margin-right: 20px;
`

const SignupForm = styled.div`
  width: 100%;
  background-color: #fff;
  height: 40px;

  input {
    border: 0;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const EmailInput = styled.input`
  display: block;
  flex-basis: 100%;
  width: 100%;
  padding-left: 16px;
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
`

const SubscribeInput = styled.input`
  display: block;
  background-color: #fff;
  padding-right: 10px;
  color: #c4333e;
  font-size: 16px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const Form = styled.form`
  width: 100%;
`

class NewsLetterSection extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.state = {
      emailValue: '',
    }
  }

  _handleSubmit() {
    // Workaround here
    // In order to get the right input value for form,
    // we delay setState function for 500 milliseconds
    _.delay(this.setState.bind(this), 500, { emailValue: '' })
  }

  _handleChange(e) {
    this.setState({
      emailValue: e.target.value,
    })
  }

  render() {
    return (
      <Container>
        <ContentContainer>
          <Icon>
            <EmailIcon />
          </Icon>
          <Form
            action={mailChimpURL}
            method="post"
            name="subscribe-form"
            target="_blank"
            onSubmit={this.handleSubmit}
            novalidate
          >
            <SignupForm>
              <EmailInput value={this.state.emailValue} type="email" name="EMAIL" placeholder="請輸入您的電子郵件位址" required onChange={this.handleChange} />
              <SubscribeInput type="submit" value="訂閱" name="subscribe" />
            </SignupForm>
          </Form>
        </ContentContainer>
      </Container>
    )
  }
}

export default NewsLetterSection
