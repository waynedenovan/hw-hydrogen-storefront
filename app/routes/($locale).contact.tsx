import type {MetaFunction} from 'react-router';

export const meta: MetaFunction = () => {
  return [{title: 'Contact Us | Hoseworld'}];
};

export default function ContactPage() {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '1rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.25rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1rem',
        color: 'white',
      }}
    >
      <h1 style={{fontSize: '1.75rem', marginBottom: '1.5rem'}}>Contact Us</h1>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        <div style={{flex: '1 1 300px'}}>
          <div style={cardStyle}>
            <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>
              Get in Touch
            </h2>
            <p style={{marginBottom: '0.75rem', lineHeight: '1.6'}}>
              Have a question about our products or need assistance with an
              order? We are here to help.
            </p>
            <div style={{marginTop: '1.5rem'}}>
              <p style={{marginBottom: '0.5rem'}}>
                <strong>Email:</strong> info@hoseworld.co.nz
              </p>
              <p style={{marginBottom: '0.5rem'}}>
                <strong>Phone:</strong> +64 (0)7 123 4567
              </p>
              <p style={{marginBottom: '0.5rem'}}>
                <strong>Hours:</strong> Mon-Fri 8am - 5pm NZST
              </p>
            </div>
          </div>
        </div>

        <div style={{flex: '1 1 300px'}}>
          <div style={cardStyle}>
            <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>
              Send a Message
            </h2>
            <form method="post">
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                required
                style={inputStyle}
                placeholder="Your name"
              />
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                required
                style={inputStyle}
                placeholder="your@email.com"
              />
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                required
                rows={5}
                style={{...inputStyle, resize: 'vertical'}}
                placeholder="How can we help?"
              />
              <button
                type="submit"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
