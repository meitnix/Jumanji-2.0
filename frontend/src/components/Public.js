import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <div align='right'>
                    <button className='button-77'><Link float="right" to="/login">Login</Link></button>
                    <button className='button-77'><Link float="right" to="/signup">Signup</Link></button>
                </div>
            </header>
            <main className="public__main">
                
            </main>
            <footer>
            <p>Located in Beautiful Kualoa Ranch nature reserve, Jumanji provides a trained staff ready to meet your adventure requirements.</p>
                <address className="public__addr">
                    Jumanji Adventures,           Honolulu, Hawaii
                </address>
                
            </footer>
        </section>

    )
    return content
}
export default Public