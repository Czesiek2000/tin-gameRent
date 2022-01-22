
export default function UserDetailsData(props){
    const { user } = props;
    return (
        <div>
            <p>Imie { user.firstname }</p>
            <p>Nazwisko { user.lastname }</p>
            <p>Email { user.email }</p>
            <p>Telefon { user.phonenumber }</p>
        </div>
    )
}