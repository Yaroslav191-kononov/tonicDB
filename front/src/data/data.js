// data.js
export const mockData = {
  hero: null,
  ingredients: null,
  catalog: null,
  catalogProduct:null,
  catalogCatalog:null,
  about: null,
  partners: null,
  blog: null,
  blogProduct:null,
  blogKatalog:null,
  seoText: null,
  seoAbout:null,
  industries: null,
  footer: null,
  tonics_hero:null,
  tonics_seo_text_full:null,
  tonics_seo_text_fullProduct:null,
  aboutSeo:null,
  navigation:null,
  form:null,
  productHero:null,
  cardsRes:null,
  invitation:null,
  characteristic:null,
  blogSection:null,
};
// Загружаем данные из API и приводим к нужной форме
export async function fetchMockData() {
  const [
    heroRes,
    ingredientsRes,
    catalogRes,
    catalogProductRes,
    catalogCatalogRes,
    aboutRes,
    partnersRes,
    blogRes,
    blogProductRes,
    blogKatalogRes,
    seoRes,
    seoAboutRes,
    footerRes,
    industriesRes,
    tonics_heroRes,
    tonics_seo_text_fullRes,
    tonics_seo_text_fullProductRes,
    aboutSeoRes,
    navigationRes,
    formRes,
    productHeroRes,
    cardsRes,
    invitationRes,
    blogSectionRes,
  ] = await Promise.all([
    fetch('http://localhost:3000/api/hero').then((r) => r.json()),
    fetch('http://localhost:3000/api/ingredients').then((r) => r.json()),
    fetch('http://localhost:3000/api/catalog/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/catalog/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/catalog/3').then((r) => r.json()),
    fetch('http://localhost:3000/api/about').then((r) => r.json()),
    fetch('http://localhost:3000/api/partners').then((r) => r.json()),
    fetch('http://localhost:3000/api/blog/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/blog/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/blog/3').then((r) => r.json()),
    fetch('http://localhost:3000/api/seo/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/invitation/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/footer').then((r) => r.json()),
    fetch('http://localhost:3000/api/industries').then((r) => r.json()),
    fetch('http://localhost:3000/api/tonics-hero/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/tonics-seo-text-full/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/tonics-seo-text-full/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/tonics-seo-text-full/4').then((r) => r.json()),
    fetch('http://localhost:3000/api/navigation').then((r) => r.json()),
    fetch('http://localhost:3000/api/form').then((r) => r.json()),
    fetch('http://localhost:3000/api/productHero/2').then((r) => r.json()),
    fetch('http://localhost:3000/api/cards').then((r) => r.json()),
    fetch('http://localhost:3000/api/invitation/1').then((r) => r.json()),
    fetch('http://localhost:3000/api/blogSection').then((r) => r.json()),
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
  //Catalog catalog
  const catalogCatalog=catalogCatalogRes ||{title:"",items:[]}
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
  //blog katalog
  const blogKatalog=blogKatalogRes;
  // SEO
  const seoText = seoRes || { title: '', text1: '', text2: '' };
  //About SEo
  const seoAbout=seoAboutRes || { title: '', text1: '', text2: '' }
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
  //SEO текст для about
  const aboutSeo=aboutSeoRes || { title: '', items: [] }
  //хедер
  const navigation=navigationRes || { title: '', items: [] };
  //форма
  const form=formRes || { title: '', items: [] };
  //Герой продукта
  const productHero=productHeroRes || { title: '', items: [] };
  //блок-карточка
  const cards=cardsRes || { title: '', items: [] }
  //about invitation
  const invitation=invitationRes || { title: '', items: [] }
  //бог-секция
  const blogSection=blogSectionRes;
  return { 
    hero,
    ingredients,
    catalog,
    catalogProduct,
    catalogCatalog,
    about,
    partners,
    blog,
    blogProduct,
    blogKatalog,
    seoText,
    seoAbout,
    footer,
    industries,
    tonics_hero,
    tonics_seo_text_full,
    tonics_seo_text_fullProduct,
    aboutSeo,
    navigation,
    form,
    productHero,
    cards,
    invitation,
    blogSection,
  };
}