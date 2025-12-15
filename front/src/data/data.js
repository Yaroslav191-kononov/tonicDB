// data.js
export const mockData = {
  hero: null,
  ingredients: null,
  catalog: null,
  catalogProduct:null,
  about: null,
  partners: null,
  blog: null,
  blogProduct:null,
  seoText: null,
  industries: null,
  footer: null,
  tonics_hero:null,
  tonics_seo_text_full:null,
  tonics_seo_text_fullProduct:null,
  navigation:null,
  form:null,
  productHero:null,
  cardsRes:null,
};
// Загружаем данные из API и приводим к нужной форме
export async function fetchMockData() {
  const [
    heroRes,
    ingredientsRes,
    catalogRes,
    catalogProductRes,
    aboutRes,
    partnersRes,
    blogRes,
    blogProductRes,
    seoRes,
    footerRes,
    industriesRes,
    tonics_heroRes,
    tonics_seo_text_fullRes,
    tonics_seo_text_fullProductRes,
    navigationRes,
    formRes,
    productHeroRes,
    cardsRes,
  ] = await Promise.all([
    fetch('http://localhost:3000/api/hero').then((r) => r.json()),
    fetch('http://localhost:3000/api/ingredients').then((r) => r.json()),
    fetch('http://localhost:3000/api/catalog/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/catalog/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/about').then((r) => r.json()),
    fetch('http://localhost:3000/api/partners').then((r) => r.json()),
    fetch('http://localhost:3000/api/blog/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/blog/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/seo').then((r) => r.json()),
    fetch('http://localhost:3000/api/footer').then((r) => r.json()),
    fetch('http://localhost:3000/api/industries').then((r) => r.json()),
    fetch('http://localhost:3000/api/tonics-hero/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/tonics-seo-text-full/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/tonics-seo-text-full/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/navigation').then((r) => r.json()),
    fetch('http://localhost:3000/api/form').then((r) => r.json()),
    fetch('http://localhost:3000/api/productHero/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/cards').then((r) => r.json()),
  ]);

  // Hero
  const hero = heroRes || {};

  // Ингредиенты: консолидируем группы в одну структуру, если API возвращает группы
  let ingredients = { title: '', items: [] };
  if (Array.isArray(ingredientsRes)) {
    // предположение: каждый элемент — группа с полем title и items
    const allItems = ingredientsRes.flatMap((grp) => grp?.items || []);
    ingredients = {
      title: ingredientsRes[0]?.title || '', // если есть название группы в ответе
      items: allItems.map((it) => ({
        name: it.name,
        x: it.x,
        y: it.y,
        main: !!it.main,
      })),
    };
  } else if (ingredientsRes && ingredientsRes.title) {
    // альтернативная форма
    ingredients = {
      title: ingredientsRes.title,
      items: ingredientsRes.items || [],
    };
  }
  // Каталог
  const catalog = catalogRes || { title: '', items: [] };
  //Каталог продУкта
  const catalogProduct=catalogProductRes || { title: '', items: [] };
  // О компании
  const about = aboutRes || {
    title: '',
    description: '',
    philosophyTitle: '',
    philosophyItems: [],
  };
  // Партнеры
  const partners = partnersRes || { title: '', items: [] };
  // Блог
  const blog = blogRes || { title: '', articles: [] };
  // Блог ДЛЯ продуктов
  const blogProduct=blogProductRes || { title: '', articles: [] }
  // SEO
  const seoText = seoRes || { title: '', text1: '', text2: '' };
  // Footer
  const footer = footerRes || {};
  //индустрии
  const industries = industriesRes || { title: '', items: [] }
  //тоник-герой
  const tonics_hero = tonics_heroRes || { title: '', items: [] }
  //SEO текст для тоника 
  const tonics_seo_text_full = tonics_seo_text_fullRes || { title: '', items: [] }
  //SEO текст для тоника в ПРОдукте
  const tonics_seo_text_fullProduct = tonics_seo_text_fullProductRes || { title: '', items: [] }
  //хедер
  const navigation=navigationRes || { title: '', items: [] };
  //форма
  const form=formRes || { title: '', items: [] };
  //Герой продукта
  const productHero=productHeroRes || { title: '', items: [] };
  //блок-карточка
  const cards=cardsRes || { title: '', items: [] }
  return {
    hero,
    ingredients,
    catalog,
    catalogProduct,
    about,
    partners,
    blog,
    blogProduct,
    seoText,
    footer,
    industries,
    tonics_hero,
    tonics_seo_text_full,
    tonics_seo_text_fullProduct,
    navigation,
    form,
    productHero,
    cards,
  };
}