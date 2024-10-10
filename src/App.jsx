/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555, 
    passport: 'S1234567A',
    nationality: 'Singapore',
    gender: 'male',
    age: 30,
    bookingTime: new Date(),
    seatNumber: 'A01',
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444, 
    passport: 'S1234567B',
    nationality: 'Singapore',
    gender: 'female',
    age: 25,
    bookingTime: new Date(),
    seatNumber: 'B01',
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
      <td>{traveller.passport}</td>
      <td>{traveller.nationality}</td>
      <td>{traveller.gender}</td>
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
          <th>Passport</th>
          <th>Nationality</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers && travellers.map(traveller => (
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
      name: '',
      phone: '',
      passport: '',
      nationality: '',
      gender: '',
      age: '',
      seatNumber: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const newTraveller = {
      name: this.state.name,
      phone: this.state.phone,
      passport: this.state.passport,
      nationality: this.state.nationality,
      gender: this.state.gender,
      age: parseInt(this.state.age, 10),
      seatNumber: this.state.seatNumber,
      bookingTime: new Date(),
    };
    this.props.bookTraveller(newTraveller);
    // reset
    this.setState({
      name: '',
      phone: '',
      passport: '',
      nationality: '',
      gender: '',
      age: '',
      seatNumber: '',
    });
  }

  render() {
    const formRowStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
    };
  
    const labelStyle = {
      width: '120px',
      textAlign: 'right',
      marginRight: '10px',
    };
  
    const inputStyle = {
      width: '100%', 
      maxWidth: '200px',
    };

    const seatsFull = this.props.availableSeats.length === 0;

    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
      {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
      {seatsFull && <p style={{ color: 'red' }}>All seats are occupied. No more travellers are allowed.</p>}
      {!seatsFull && (
          <>
            <div style={formRowStyle}>
              <label style={labelStyle}>Name:</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Phone:</label>
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Passport:</label>
              <input
                type="text"
                name="passport"
                value={this.state.passport}
                onChange={this.handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Nationality:</label>
              <input
                type="text"
                name="nationality"
                value={this.state.nationality}
                onChange={this.handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Gender:</label>
              <select
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange}
                style={inputStyle}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Age:</label>
              <input
                type="number"
                name="age"
                value={this.state.age}
                onChange={this.handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Seat Number:</label>
              <select
                name="seatNumber"
                value={this.state.seatNumber}
                onChange={this.handleChange}
                style={inputStyle}
                required
              >
                <option value="">Select a seat</option>
                {this.props.availableSeats.map(seat => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
            </div>

            <div style={formRowStyle}>
              <button type="submit">Add</button>
            </div>
          </>
        )}
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      passport: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const { name, passport } = this.state;
    this.props.deleteTraveller(name, passport);
    // reset
    this.setState({
      name: '',
      passport: '',
    });
  }

  render() {
    const formRowStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
    };

    const labelStyle = {
      width: '120px',
      textAlign: 'right',
      marginRight: '10px',
    };

    const inputStyle = {
      width: '100%', 
      maxWidth: '200px',
    };

    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <div style={formRowStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formRowStyle}>
          <label style={labelStyle}>Passport:</label>
          <input
            type="text"
            name="passport"
            value={this.state.passport}
            onChange={this.handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formRowStyle}>
          <button type="submit">Delete</button>
        </div>
      </form>
    );
  }
}

const totalSeats = 10;
const seatRows = ['A', 'B'];
const seatColumns = ['01', '02', '03', '04', '05'];
const allSeats = seatRows.flatMap(row => seatColumns.map(col => row + col));

class Homepage extends React.Component {
	constructor() {
	  super();
	}

render() {
  const { travellers } = this.props;
  const occupiedSeats = travellers.map(traveller => traveller.seatNumber);

  return (
    <div>
      <h2>Welcome to the High-Speed Railway Reservation System</h2>
      <p>Total Seats: {totalSeats}</p>
      <p>Occupied Seats: {travellers.length}</p>
      <p>Free Seats: {totalSeats - travellers.length}</p>

      {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {seatRows.map((row) => (
          <div key={row} style={{ display: 'flex' }}>
            {seatColumns.map((col) => {
              const seatNumber = row + col;
              const isOccupied = occupiedSeats.includes(seatNumber);
              return (
                <div
                  key={seatNumber}
                  style={{
                    width: '30px',
                    height: '30px',
                    margin: '5px',
                    backgroundColor: isOccupied ? 'grey' : 'green',
                    border: '1px solid black',
                  }}
                >
                  {/* no content for seat space */}
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1, nextId: 3};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value){
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

  bookTraveller(newTraveller) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    if (this.state.travellers.length >= totalSeats) {
      alert("All seats are occupied. No more bookings are allowed.");
      return; // stop adding more passengers
    }

    const id = this.state.nextId;
    const travellerWithId = { ...newTraveller, id };
    this.setState((prevState) => ({
      travellers: [...prevState.travellers, travellerWithId],
      nextId: prevState.nextId + 1, // increment nextId
    }));  
  }

  deleteTraveller(name, passport) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const travellerExists = this.state.travellers.some(
      (traveller) =>
        traveller.name === name && traveller.passport === passport
    );
  
    if (!travellerExists) {
      alert("Traveller not found. Please check the name and passport number.");
      return;
    }
  
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter(
        (traveller) =>
          traveller.name !== name || traveller.passport !== passport
      ),
    }));
  }
  
  render() {
    /* Occupied and available seats */
    const occupiedSeats = this.state.travellers.map(traveller => traveller.seatNumber);
    const availableSeats = allSeats.filter(seat => !occupiedSeats.includes(seat));

    return (
      <div>
        <h1>Ticket To Ride</h1>
	      <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button onClick={() => this.setSelector(1)}>Homepage</button>
          <button onClick={() => this.setSelector(2)}>Display Travellers</button>
          <button onClick={() => this.setSelector(3)}>Add Traveller</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {this.state.selector === 1 && (
            /* Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats. */
            <Homepage travellers={this.state.travellers} />
          )}
          {this.state.selector === 2 && (
            /* Q3. Code to call component that Displays Travellers. */
            <Display travellers={this.state.travellers} />
          )}
          {this.state.selector === 3 && (
            /* Q4. Code to call the component that adds a traveller. */
            <Add bookTraveller={this.bookTraveller} availableSeats={availableSeats} />
          )}
          {this.state.selector === 4 && (
            /* Code to call the component that deletes a traveller based on a given attribute. */
            <Delete deleteTraveller={this.deleteTraveller} />
          )}
        </div>
      </div>
    );
  }
}
const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById('contents'));