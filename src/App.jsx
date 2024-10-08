/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555, 
    /*email: 'jack@example.com',*/
    age: 30,
    bookingTime: new Date(),
    seatNumber: 'A1',
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444, 
    /*email: 'rose@example.com',*/
    age: 25,
    bookingTime: new Date(),
    seatNumber: 'B1',
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      {/* <td>{traveller.email}</td> */}
      <td>{traveller.age}</td>
      <td>{traveller.bookingTime.toDateString()}</td>
      <td>{traveller.seatNumber}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          {/* <th>Email</th> */}
          <th>Age</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      travellerName: '',
      phone: '',
      age: '',
      seatNumber: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const newTraveller = {
      id: Date.now(),  // 使用当前时间作为唯一ID
      name: this.state.travellerName,
      phone: this.state.phone,
      bookingTime: new Date(),
      age: this.state.age,
      seatNumber: this.state.seatNumber,
    };
    this.props.bookTraveller(newTraveller); // 调用父组件的 bookTraveller 方法
    this.setState({ travellerName: '', phone: '', age: '', seatNumber: '' }); // 清空表单
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }); // 更新状态
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        {/* Q4. 输入旅客姓名 */}
        <input
          type="text"
          name="travellerName"
          value={this.state.travellerName}
          onChange={this.handleChange}
          placeholder="Name"
          required
        />
        {/* Q4. 输入旅客电话 */}
        <input
          type="text"
          name="phone"
          value={this.state.phone}
          onChange={this.handleChange}
          placeholder="Phone"
          required
        />
        {/* Q4. 输入旅客年龄 */}  
        <input
          type="text"
          name="age"
          value={this.state.age}
          onChange={this.handleChange}
          placeholder="Age"
          required
        />
        {/* Q4. 输入座位号 */}
        <input
          type="text"
          name="seatNumber"
          value={this.state.seatNumber}
          onChange={this.handleChange}
          placeholder="Seat Number"
          required
        />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.state = {
      travellerName: '', // 用于存储输入的旅客姓名
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const travellerName = this.state.travellerName;
    this.props.deleteTraveller(travellerName); // 调用父组件的 deleteTraveller 方法
    this.setState({ travellerName: '' }); // 提交后清空表单
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }); // 更新输入框的状态
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        {/* Q5. 输入要删除的旅客姓名 */}
        <input
          type="text"
          name="travellerName"
          value={this.state.travellerName}
          onChange={this.handleChange}
          placeholder="Name"
          required
        />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  render() {
    const { travellers, displayFreeSeats } = this.props;
    const totalSeats = 10; // 假设火车总共有10个座位
    const reservedSeats = travellers.length;
    const freeSeats = totalSeats - reservedSeats;

    return (
      <div>
        {/* Q2. 导航栏 */}
        <nav>
          <button onClick={() => this.props.setSelector(1)}>Add Traveller</button>
          <button onClick={() => this.props.setSelector(2)}>Delete Traveller</button>
          <button onClick={() => this.props.setSelector(3)}>Display Travellers</button>
        </nav>

        {/* Q2. 显示空闲座位数 */}
        <h3>Free Seats: {freeSeats} / {totalSeats}</h3>

        {/* Q2. 显示座位的可视化示例 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
          {Array.from({ length: totalSeats }).map((_, index) => (
            <div
              key={index}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: index < reservedSeats ? 'gray' : 'green',
                border: '1px solid black',
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState((prevState) => ({
        travellers: [...prevState.travellers, passenger] // 添加新旅客到列表
      }));
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter(traveller => traveller.name !== passenger)
    }));
  }
  render() {
    const { selector, travellers } = this.state;
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          <button onClick={() => this.setSelector(1)}>Homepage</button>
          <button onClick={() => this.setSelector(2)}>Display Travellers</button>
          <button onClick={() => this.setSelector(3)}>Add Traveller</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
        {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        </div>
        <div>
          {selector === 1 && (
            // Homepage组件显示空座位信息
            <Homepage travellers={travellers} setSelector={this.setSelector} />
          )}

          {selector === 2 && (
            // Q3. 显示旅客信息的组件
            <Display travellers={travellers} />
          )}

          {selector === 3 && (
            // Q4. 添加旅客的组件
            <Add bookTraveller={this.bookTraveller} />
          )}

          {selector === 4 && (
            // Q5. 删除旅客的组件
            <Delete deleteTraveller={this.deleteTraveller} />
          )}
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {/*Q3. Code to call component that Displays Travellers.*/}
      
          {/*Q4. Code to call the component that adds a traveller.*/}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
