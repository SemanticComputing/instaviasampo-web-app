const perspectiveID = 'persons'

export const personProperties = `
    {
      ?id rdfs:label ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id),  "http://ldf.fi/intaviasampo/", "")) AS ?prefLabel__dataProviderUrl)
    }
    UNION
    {
      ?id itv:countryOfOrigin ?sourceCountry__id .
      BIND(?sourceCountry__id AS ?sourceCountry__prefLabel)
    }
    UNION
    {
      ?id itv:deathPlace ?deathPlace__id .
      ?deathPlace__id rdfs:label ?deathPlace__prefLabel .
    }
    UNION
    {
      ?id itv:birthPlace ?birthPlace__id .
      ?birthPlace__id rdfs:label ?birthPlace__prefLabel .
    }
    UNION
    {
      ?id itv:gender ?gender__id .
      BIND(?gender__id AS ?gender__prefLabel)
    }
    UNION
    {
      ?id itv:occupation ?occupation__id .
      BIND(?occupation__id AS ?occupation__prefLabel)
    }
    UNION
    {
      ?id itv:birthYear ?birthYear .
    }
    UNION
    {
      ?id itv:deathYear ?deathYear .
    }
    UNION
    {
      ?id itv:age ?age.
    }
`

export const birthPlacesQuery = `
  SELECT DISTINCT ?id ?lat ?long
  (1 as ?instanceCount) # for heatmap
  WHERE {
    <FILTER>
    ?id itv:birthPlace/wgs84:lat ?lat ;
    itv:birthPlace/wgs84:long ?long .
  }
`