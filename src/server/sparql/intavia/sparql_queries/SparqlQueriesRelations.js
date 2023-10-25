const perspectiveID = 'relations'

export const relationProperties = `
    {
      ?id rdfs:label  ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      #BIND(?id as ?uri__id)
      ##BIND(?id as ?uri__dataProviderUrl)
      #BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id itv:relationSubject ?relationSubject__id .
      ?relationSubject__id rdfs:label ?relationSubject__prefLabel .
    }
    UNION
    {
      ?id itv:relationObject ?relationObject__id .
      ?relationObject__id rdfs:label ?relationObject__prefLabel .
    }
`

export const placesQuery = `
  SELECT DISTINCT ?id ?lat ?long
  (1 as ?instanceCount) # for heatmap
  WHERE {
    <FILTER>
    ?id relse:placeObject/relse:nbf/geo:lat ?lat ;
    relse:placeObject/relse:nbf/geo:long ?long .
  }
`

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`

// # https://github.com/uber/deck.gl/blob/master/docs/layers/arc-layer.md
export const migrationsQuery = `
  SELECT DISTINCT ?id 
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  (COUNT(DISTINCT ?manuscript) as ?instanceCount)
  WHERE {
    <FILTER>
    ?relation itv:relationSubject/itv:birthPlace ?from__id ;
            itv:relationObject/itv:birthPlace ?to__id .
    ?from__id rdfs:label ?from__prefLabel ;
              geo:lat ?from__lat ;
              geo:long ?from__long .
    BIND(STR(?from__id) AS ?from__dataProviderUrl)
    ?to__id rdfs:label ?to__prefLabel ;
            geo:lat ?to__lat ;
            geo:long ?to__long .
    BIND(STR(?to__id) AS ?to__dataProviderUrl)
    BIND(IRI(CONCAT(STR(?from__id), "-", REPLACE(STR(?to__id), "http://ldf.fi/intaviasampo/place/", ""))) as ?id)
    FILTER(?from__id != ?to__id)
  }
  GROUP BY ?id 
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  ORDER BY desc(?instanceCount)
`

export const migrationsDialogQuery = `
  SELECT * {
    <FILTER>
    ?id ^crm:P108_has_produced/crm:P7_took_place_at <FROM_ID> ;
                    mmm-schema:last_known_location <TO_ID> ;
                    skos:prefLabel ?prefLabel .
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?dataProviderUrl)
  }
`
