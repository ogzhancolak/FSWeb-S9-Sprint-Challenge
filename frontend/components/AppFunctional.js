import React, {useState} from 'react'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [activeIndex, setActiveIndex] = useState(initialIndex);


  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (activeIndex % 3) + 1;
    const y = Math.floor(activeIndex / 3) + 1;
    return { x, y };
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const { x, y } = getXY();
    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setActiveIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    let newIndex;
    switch (yon) {
      case 'sol':
        newIndex = activeIndex - 1;
        break;
      case 'yukarı':
        newIndex = activeIndex - 3;
        break;
      case 'sağ':
        newIndex = activeIndex + 1;
        break;
      case 'aşağı':
        newIndex = activeIndex + 3;
        break;
      default:
        return activeIndex;
    }
    if (newIndex >= 0 && newIndex < 9) {
      return newIndex;
    }
    return activeIndex;
  }

  function ilerle(yon) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const newIndex = sonrakiIndex(yon);
    setActiveIndex(newIndex);
    setSteps(steps + 1);
    setMessage('');
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    // POST işlemini burada gerçekleştirebilirsiniz
    setMessage(`Email gönderildi: ${email}`);
    setEmail('');
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === activeIndex ? ' active' : ''}`}>
            {idx === activeIndex ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => ilerle('sol')}>
          SOL
        </button>
        <button id="up" onClick={() => ilerle('yukarı')}>
          YUKARI
        </button>
        <button id="right" onClick={() => ilerle('sağ')}>
          SAĞ
        </button>
        <button id="down" onClick={() => ilerle('aşağı')}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="email girin" value={email} onChange={onChange} />
        <input id="submit" type="submit" />
      </form>
    </div>
  )
}
